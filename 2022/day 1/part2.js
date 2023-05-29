const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const fileArray = fileContents.toString().split("\n");
let highestArray = [];
const limit = 3;
const sortByHighest = (a, b) => {
  return a > b ? -1 : 1;
};
fileArray.reduce((prev, curr) => {
  const current = Number(curr);
  if (current) {
    const total = current + prev;
    if (highestArray.length < limit) {
      highestArray.push(total);
      highestArray = highestArray.sort(sortByHighest);
    } else {
        for (value in highestArray) {
            if (total > value) {
                highestArray.push(total);
                highestArray.sort(sortByHighest);
                highestArray = highestArray.slice(0, limit);
                break;
            }
        }
    }
    return total;
  }
  return 0;
}, 0);

const answer = highestArray.reduce((prev, curr) => {
    return prev + curr;
}, 0);

console.log(answer);
