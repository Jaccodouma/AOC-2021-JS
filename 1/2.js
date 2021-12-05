import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('1/input.txt', 'utf8').split("\r\n").map(str => parseInt(str));

  return arr;
}

export default function solve() {
  let data = getData();

  let count = 0;

  for (let i = 3; i < data.length; i++) {
    if (
      (data[i - 3] + data[i - 2] + data[i - 1]) <
      (data[i - 2] + data[i - 1] + data[i])
    ) {
      count++
    }
  }

  return count; 
};