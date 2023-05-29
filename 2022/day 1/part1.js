const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const fileArray = fileContents.toString().split("\n");
let currentHighest = 0;
fileArray.reduce((prev, curr) => {
    const current = Number(curr);
    if (current) {
        const total = current + prev;
        if (total > currentHighest) {
            currentHighest = total;
        }
        return total;
    }
    return 0;
}, 0)
console.log(currentHighest);