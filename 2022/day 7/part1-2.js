// https://adventofcode.com/2022/day/7
// Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?
// Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?
const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString().split("\n");;

const fileSystem = {};

let currentDirectoryList = [];

puzzleInput.forEach(line => {
  const [part1, part2, part3] = line.split(" ");
  if (part1 === "$") {
    switch (part2) {
      case "cd":
        if (part3 === "..") {
          currentDirectoryList.pop();
        } else if (part3 !== "/") {
          currentDirectoryList.push(part3);
        }
        break;
      default:
        // "ls" case; don't need it
        break;
    }
  } else {
    let currentDirectory = fileSystem;
    currentDirectoryList.forEach((directory) => {
      currentDirectory = currentDirectory[directory];
    });
    if (part1 === "dir") {
      currentDirectory[part2] = {};
    } else {
      currentDirectory[part2] = +part1;
    }
  }
});

// console.log(fileSystem);

const sizeLimit = 100000;
const directorySizesUnderLimit = [];
const allDirectorySizes = [];
currentDirectoryList = [];
const duplicatedFileSystem = JSON.parse(JSON.stringify(fileSystem));

const determineDirectorySizes = (directory) => {
  for (let key in directory) {
    if (!directory.hasOwnProperty(key)) {
      continue; 
    }
    const value = directory[key];
    if (typeof value === "object" && value !== null) {
      currentDirectoryList.push(key);
      determineDirectorySizes(value);
    } else {
      directory.directorySize = (directory.directorySize || 0) + Number(value);
      delete directory[key];
    }
    if (Object.entries(directory).length === 1 && directory.directorySize && currentDirectoryList.length) {
      let upwardsDirectory = duplicatedFileSystem;
      const currentDirectoryKey = currentDirectoryList.pop();
      currentDirectoryList.forEach((directory) => {
        upwardsDirectory = upwardsDirectory[directory];
      });
      if (upwardsDirectory) {
        upwardsDirectory.directorySize =
          (upwardsDirectory.directorySize || 0) + Number(directory.directorySize || 0);
      }
      if (directory.directorySize <= sizeLimit) {
        directorySizesUnderLimit.push(directory.directorySize);
      }
      allDirectorySizes.push(directory.directorySize);
      delete upwardsDirectory[currentDirectoryKey];
    }
  }
}

determineDirectorySizes(duplicatedFileSystem);

console.log(directorySizesUnderLimit.reduce((prev, curr) => {
  return prev + curr;
}, 0));

const totalDeviceSize = 70000000;
const updateSize = 30000000;
const allowedRemainingFileSize =
  totalDeviceSize - updateSize;
const requiredSpaceToDeleteForUpdate = duplicatedFileSystem.directorySize - allowedRemainingFileSize;
let directorySizeToDelete = 0;

const sortedDirectories = allDirectorySizes.sort((a, b) => {
  return a < b ? -1 : 1;
});
for (let index in sortedDirectories) {
  const directorySize = sortedDirectories[index];
  if (directorySize < requiredSpaceToDeleteForUpdate) {
    continue;
  }
  directorySizeToDelete = directorySize;
  break;
}

console.log(directorySizeToDelete, requiredSpaceToDeleteForUpdate);