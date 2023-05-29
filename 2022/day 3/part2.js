// Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
const fs = require("fs");

const fileContents = fs.readFileSync("./puzzle_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const fileArray = fileContents.toString().split("\n");

// https://javascript.plainenglish.io/create-an-array-of-alphabet-characters-in-javascript-with-this-simple-trick-930033079dd3
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const lowercaseAlphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const uppercaseAlphabet = alpha.map((x) => String.fromCharCode(x));
const alphabet =  [...lowercaseAlphabet, ...uppercaseAlphabet];

const groupSize = 3;
// 0 index alphabet means the index is 1 lower than the actual priority for each letter
// so adding 1 priority back for every group of elves
let prioritySum = fileArray.length / groupSize;
let itemQuantities = {};
for (let index in fileArray) {
  const rucksack = fileArray[index];
  const items = new Set(rucksack.split(""));
  items.forEach(item => {
    if (itemQuantities[item]) {
      itemQuantities[item] += 1;
    } else {
      itemQuantities[item] = 1;
    }
  })
  if (index % groupSize === groupSize - 1) {
    const badgeKey = Object.keys(itemQuantities).find(
      (key) => itemQuantities[key] === groupSize
    );
    prioritySum += alphabet.indexOf(badgeKey);
    itemQuantities = {};
  }
}

console.log(prioritySum);