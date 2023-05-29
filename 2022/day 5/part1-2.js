const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString().split("\n");
const picture = puzzleInput.slice(0, 8).reverse();
const stacks = [];
const inputIndeces = [];
const firstRow = picture[0];
firstRow.split("").forEach((character, index) => {
  if (character === "[") {
    inputIndeces.push(index + 1);
  }
});
picture.forEach((row) => {
  inputIndeces.forEach(index => {
    if (row[index] !== " ") {
      const stackIndex = inputIndeces.indexOf(index);
      if (stacks[stackIndex]) {
        stacks[stackIndex].push(row[index]);
      } else {
        stacks[stackIndex] = [row[index]];
      }
    }
  })
})
const instructions = puzzleInput.slice(10);

instructions.forEach(instruction => {
  const instructionParts = instruction.split(" ");
  const quantity = instructionParts[1];
  // 0 indeces
  const fromColumn = instructionParts[3] - 1;
  const toColumn = instructionParts[5] - 1;
  // part 1 solution
  // for (let i = 0; i < quantity; i++) {
  //   const lastCrate = stacks[fromColumn].pop();
  //   stacks[toColumn].push(lastCrate);
  // }
  // part 2 solution
  const movedCrates = stacks[fromColumn].splice(quantity * -1);
  stacks[toColumn] = [...stacks[toColumn], ...movedCrates];
});

console.log(stacks.reduce((prev, curr) => {
  return `${prev}${curr.pop()}`
}, ""));

