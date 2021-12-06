import fs from 'fs';
/**
 * New fish every 7 days 
 * Fishes might have between 1-7 days left
 * new fish need 2 more days 
 */

function getData() {
  let arr = fs.readFileSync('6/input.txt', 'utf8').split(",").map(s => parseInt(s));
  return arr;
}

function simulateStep(data) {
  let newData = {};

  for (const [key, value] of Object.entries(data)) {
    if (key == '0') {
      newData['6'] = newData['6'] ? newData['6'] + value : value;
      newData['8'] = value;
    } else {
      newData[parseInt(key) - 1] = newData[parseInt(key) - 1] ? newData[parseInt(key) - 1] + value : value;
    }
  }

  return newData;
}

export default function solve() {
  let data = getData();

  let counts = {};

  for (const number of data) {
    counts[number] = counts[number] ? counts[number] + 1 : 1;
  }

  for (let day = 0; day < 256; day++) {
    counts = simulateStep(counts);
  }

  return Object.values(counts).reduce((a, b) => a + b, 0);
};