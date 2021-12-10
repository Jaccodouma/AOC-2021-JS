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

function getRemainingQueue(line) {
  let queue = [];

  for (const char of [...line]) {
    if (isOpeningChar(char)) {
      queue.push(char)
    } else {
      let opener = queue.pop();
      if (opener !== getOpposingChar(char)) {
        return undefined
      }; 
    };
  }

  return queue;
}

function getScore(char) {
  if (char == '(') return 1; 
  if (char == '[') return 2; 
  if (char == '{') return 3; 
  if (char == '<') return 4; 
  return 0; 
}

export default function solve() {
  let lines = getData();

  let scores = [];

  for (const line of lines) {
    let queue = getRemainingQueue(line);
    if (!queue) continue; 

    let score = 0; 
    for (const char of queue.reverse()) {
      score *= 5; 
      score += getScore(char);
    }
    scores.push(score);
  }

  return(scores.sort((a,b) => a-b)[Math.floor(scores.length/2)]);
};