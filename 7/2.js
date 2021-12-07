import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('7/input.txt', 'utf8').split(",").map(s => parseInt(s)).sort(((a, b) => a - b));

  return arr;
}

function moveCosts(a, b) {
  let total = 0; 
  for (let i = 1; i <= Math.abs(a-b); i++) {
    total+=i;
  }
  return total; 
}

export default function solve() {
  let data = getData();

  let answers = [];

  for (let i = Math.min(...data); i < Math.max(...data); i++) {
    let answer = 0;
    for (const number of data) {
      answer += moveCosts(number, i);
    }
    answers.push(answer);
  }

  return Math.min(...answers);
};