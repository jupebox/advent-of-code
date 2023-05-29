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
};

const outcomePointMap = {
  loss: 0,
  tie: 3,
  win: 6,
};

const winShapes = {"A": "B", "B": "C", "C": "A"};

const tieShapes = {"A": "A", "B": "B", "C": "C"};

const loseShapes = {"A": "C", "B": "A", "C": "B"};

let points = 0;

for (index in fileArray) {
    const value = fileArray[index].trim();
  const outcomeCode = value.slice(-1);
  let outcomeShapes = loseShapes;
  let pointTotal = 0;
  if (outcomeCode === "Z") {
    outcomeShapes = winShapes;
    pointTotal += outcomePointMap["win"];
  } else if (outcomeCode === "Y") {
    outcomeShapes = tieShapes;
    pointTotal += outcomePointMap["tie"];
  }
  const opponentHandShape = value.slice(0, 1);
const handShape = outcomeShapes[opponentHandShape];
  pointTotal += shapePointMap[handShape];
  points += pointTotal;
}

console.log(points);
