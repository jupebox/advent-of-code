// https://adventofcode.com/2022/day/10
// Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?
const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString().split("\n");

const cycleStart = 20;
const cycleCadence = 40;
const cycleEnd = 220;
let xRegister = 1;
let cycleCount = 0;
let signalStrength = 0;
const queue = [];

const cycle = () => {
    const value = queue.pop() || 0;
    cycleCount += 1;
    if (cycleCount === cycleStart || !((cycleCount - cycleStart) % cycleCadence)) {
        signalStrength += xRegister * cycleCount;
    }
    xRegister += value;
}

for (const line of puzzleInput) {
    if (cycleCount > cycleEnd) {
        break;
    }
    if (line === "noop") {
        cycle();
    } else {
        const value = line.slice(line.indexOf(" ") + 1);
        queue.push(Number(value));
        queue.push(0);
        cycle();
        cycle();
    }
};

console.log(signalStrength);