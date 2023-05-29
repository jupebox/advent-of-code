const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const fileArray = fileContents.toString().split("\n");

const shapePointMap = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const outcomePointMap = {
  loss: 0,
  tie: 3,
  win: 6,
};

const winShapes = ["A Y", "B Z", "C X"];

const tieShapes = ["A X", "B Y", "C Z"];

let points = 0;

for (index in fileArray) {
    const value = fileArray[index].trim();
  const handShape = value.slice(-1);
  let pointTotal = shapePointMap[handShape];
  if (winShapes.includes(value)) {
    pointTotal += outcomePointMap["win"];
  } else if (tieShapes.includes(value)) {
    pointTotal += outcomePointMap["tie"];
  }
  points += pointTotal;
}

console.log(points);
