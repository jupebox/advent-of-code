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

// 0 index alphabet means the index is 1 lower than the actual priority for each letter
// so adding 1 priority back for every item
let prioritySum = fileArray.length;

fileArray.forEach((rucksack) => {
  const rucksackLimit = rucksack.length / 2;
  const firstCompartment = rucksack.slice(0, rucksackLimit);
  const secondCompartment = rucksack.slice(rucksackLimit);
  let duplicateItem;
  const firstCompartmentItems = firstCompartment.split("");
  for (let index in firstCompartmentItems) {
    const item = firstCompartmentItems[index];
    if (secondCompartment.indexOf(item) > -1) {
      duplicateItem = item;
      break;
    }
  }
  prioritySum += alphabet.indexOf(duplicateItem);
}); 

console.log(prioritySum);