// https://adventofcode.com/2022/day/10
// Render the image given by your program. What eight capital letters appear on your CRT?
const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString().split("\n");

const cycleCadence = 40;
const cycleEnd = 240;
let xRegister = 1;
let cycleCount = 0;
const queue = [];
const output = [];

const cycle = () => {
    const value = queue.pop() || 0;
    const renderedPixel = cycleCount % cycleCadence;
    cycleCount += 1;
    const spritePositions = [xRegister - 1, xRegister, xRegister + 1];
    output.push(spritePositions.includes(renderedPixel) ? "#" : ".");
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

while (output.length) {
    console.log(output.splice(0, 40).toString().replaceAll(",", ""));
}