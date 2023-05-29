const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString().split("\n");

let visibleTreesCount = 0;

const isTreeBlocked = (trees, treeIndex) => {
  const currentTree = trees[treeIndex];
  if (!currentTree) {
    return true;
  }
  let isTreeBlocked = false;
  for (let i = 0; i < treeIndex; i++) {
    const rowTree = trees[i];
    if (rowTree >= currentTree) {
      isTreeBlocked = true;
      break;
    }
  }
  return isTreeBlocked;
};

puzzleInput.forEach((row, rowIndex) => {
  // account for all trees on the outer edges
  if (rowIndex === 0 || rowIndex === puzzleInput.length - 1) {
    visibleTreesCount += row.length;
    return;
  }
  const rowTrees = row.split("");
  for (let columnIndex = 0; columnIndex <= rowTrees.length; columnIndex++) {
    // account for all trees on the outer edges
    if (columnIndex === 0 || columnIndex === rowTrees.length - 1) {
      visibleTreesCount += 1;
    } else {
      // check inner trees
      let isCurrentTreeBlocked;
      isCurrentTreeBlocked = isTreeBlocked(rowTrees, columnIndex);
      
      if (!isCurrentTreeBlocked) {
        visibleTreesCount += 1;
        continue;
      } else {
      isCurrentTreeBlocked = isTreeBlocked(
        [...rowTrees].reverse(),
        rowTrees.length - columnIndex - 1
      );
      }
      if (!isCurrentTreeBlocked) {
        visibleTreesCount += 1;
        continue;
      }
      
      const column = puzzleInput.reduce((prev, curr) => {
        return [...prev, curr[columnIndex]];
      }, []);
      isCurrentTreeBlocked = isTreeBlocked(column, rowIndex);
      if (!isCurrentTreeBlocked) {
        visibleTreesCount += 1;
        continue;
      } else {
        isCurrentTreeBlocked = isTreeBlocked(
          [...column].reverse(),
          column.length - rowIndex - 1
        );
        if (!isCurrentTreeBlocked) {
          visibleTreesCount += 1;
          continue;
        }
      }
    }
  }
});

console.log(visibleTreesCount);
