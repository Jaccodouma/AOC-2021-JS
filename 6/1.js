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
  let newData = []; 
  for (const age of data) {
    let newAge = age - 1; 
    if (newAge < 0) {
      newAge = 6;
      newData.push(8);
    }
    newData.push(newAge);
  }
  return newData;
}

export default function solve() {
  let data = getData();

  for (let day = 0; day < 80; day++) {
    data = simulateStep(data);
  }

  return(data.length);
};