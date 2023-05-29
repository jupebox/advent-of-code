// https://adventofcode.com/2022/day/6
// How many characters need to be processed before the first start-of-packet marker is detected?
// How many characters need to be processed before the first start-of-message marker is detected?
const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const puzzleInput = fileContents.toString();

let index = 0;
let areDifferent = false;
const markerLength = 14;

while (!areDifferent) {
  const marker = puzzleInput.slice(index, index + markerLength);
  const tokens = marker.split("");
  let isInvalid = false;
  for (let tokenIndex = 0; tokenIndex < (tokens.length); tokenIndex++) {
    const token = tokens[tokenIndex];
    if (marker.slice(tokenIndex + 1).indexOf(token) > -1) {
      isInvalid = true;
      break;
    }
  }
  if (!isInvalid) {
    areDifferent = true;
  } else {
      index += 1;
  }
}

console.log(index + markerLength);