import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('1/input.txt', 'utf8').split("\r\n").map(str => parseInt(str));

  return arr;
}

export default function solve() {
  let data = getData();

  let count = 0; 
  let lastNumber = data[0];

  for (let number of data) {
    if (number > lastNumber) {
      count++; 
    }; 
    lastNumber = number;
  }

  return count; 
};