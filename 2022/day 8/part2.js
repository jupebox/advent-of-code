const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString().split("\n");

let largestScore = 0;

const countTrees = (arr, tallestTree) => {
  let visibleTreeCount = 0;
  for (let treeIndex = 0; treeIndex < arr.length; treeIndex++) {
    const tree = Number(arr[treeIndex]);
    visibleTreeCount += 1;
    if (tree >= tallestTree) {
      break;
    }
  }
  return visibleTreeCount;
};

puzzleInput.forEach((row, rowIndex) => {
  const trees = row.split("");
  // for each tree in each column in each row
  for (let columnIndex = 0; columnIndex < trees.length; columnIndex++) {
    const currentTree = Number(trees[columnIndex]);
    const column = puzzleInput.reduce((prev, curr) => {
      return [...prev, curr[columnIndex]];
    }, []);
    const leftTrees =
      columnIndex === 0 ? [] : trees.slice(0, columnIndex).reverse();
    const rightTrees =
      columnIndex === row.length - 1 ? [] : trees.slice(columnIndex + 1);
    const topTrees =
      rowIndex === puzzleInput.length - 1
        ? column.reverse()
        : column.slice(0, rowIndex).reverse();
    const bottomTrees =
      rowIndex === puzzleInput.length - 1 ? [] : column.slice(rowIndex + 1);

    const visibleTreesToTheLeft = countTrees(leftTrees, currentTree);
    const visibleTreesToTheRight = countTrees(rightTrees, currentTree);
    const visibleTreesToTheTop = countTrees(topTrees, currentTree);
    const visibleTreesToTheBottom = countTrees(bottomTrees, currentTree);
    const currentScore =
      visibleTreesToTheLeft *
      visibleTreesToTheRight *
      visibleTreesToTheTop *
      visibleTreesToTheBottom;
    if (currentScore > largestScore) {
      largestScore = currentScore;
    }
  }
});

console.log(largestScore);
