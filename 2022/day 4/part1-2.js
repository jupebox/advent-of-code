// https://adventofcode.com/2022/day/4
// In how many assignment pairs does one range fully contain the other?
// In how many assignment pairs do the ranges overlap?
const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const tuples = fileContents.toString().split("\n");

let incorrectAssignmentCount = 0;

const aContainsB = (a, b) => {
  return ((+a[0] <= +b[0]) && (+a[1] >= +b[1]));
}
// 7-88,27-89
const aOverlapsB = (a, b) => {
  if (aContainsB(a, b) || (+a[0] <= +b[0] && +a[1] <= +b[1] && +a[1] >= +b[0])) {
    return true;
  }
  return false;
}

tuples.forEach(tuple => {
  const arr = tuple.split(",");
  const range1 = arr[0].split("-");
  const range2 = arr[1].split("-");
  if (aOverlapsB(range1, range2) || aOverlapsB(range2, range1)) {
    incorrectAssignmentCount += 1;
  }
});

console.log(incorrectAssignmentCount);