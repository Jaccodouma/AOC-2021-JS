import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('10/input.txt', 'utf8').split("\r\n");

  return arr;
}

function isOpeningChar(char) {
  return [...'([{<'].includes(char);
}

function getOpposingChar(char) {
  const c1 = [...'([{<)]}>'];
  const c2 = [...')]}>([{<'];

  return c2[c1.findIndex(c => c == char)];
}

function getFirstIllegalChar(line) {
  let queue = [];

  for (const char of [...line]) {
    if (isOpeningChar(char)) {
      queue.push(char)
    } else {
      let opener = queue.pop();
      if (opener !== getOpposingChar(char)) return char;
    };
  }
}

function getScore(char) {
  if (char == ')') return 3; 
  if (char == ']') return 57; 
  if (char == '}') return 1197; 
  if (char == '>') return 25137; 
  return 0;
}

export default function solve() {
  let lines = getData();

  let points = 0;

  lines.forEach(line => {
    let char = getFirstIllegalChar(line);
    points += getScore(char);
  });

  return points;
};