// https://adventofcode.com/2022/day/9
// Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?
// Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?
const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString().split("\n");

const startingPosition = [0, 0];
const tailPositions = ["0,0"];
const numberOfKnots = 10; // 2
const knotPositions = [];

for (let i = 0; i < numberOfKnots; i++) {
    knotPositions.push([...startingPosition]);
}

const headPosition = knotPositions[0];
const tailPosition = knotPositions[knotPositions.length - 1];

const dictionary = {
    U: [0, -1],
    D: [0, 1],
    R: [1, 0],
    L: [-1, 0]
};

puzzleInput.forEach(line => {
    const [direction, length] = line.split(" ");
    for (let i = 0; i < Number(length); i++) {
        // move leading knot
        headPosition[0] += (dictionary[direction][0]);
        headPosition[1] += (dictionary[direction][1]);
        for (let j = 1; j < numberOfKnots; j++) {
            const leadingKnot = knotPositions[j - 1];
            const trailingKnot = knotPositions[j];
            const differential = [leadingKnot[0] - trailingKnot[0], leadingKnot[1] - trailingKnot[1]];
            // move trailing knot
            if (Math.abs(differential[0]) > 1 || Math.abs(differential[1]) > 1) {
                trailingKnot[0] += Math.sign(differential[0]);
                trailingKnot[1] += Math.sign(differential[1]);
            }
            if (j === numberOfKnots - 1) {
                const tailPositionString = `${tailPosition[0]},${tailPosition[1]}`;
                tailPositions.push(tailPositionString);
            }
        }
    }
});

const uniqueTailPositions = new Set(tailPositions);

console.log(uniqueTailPositions.size);