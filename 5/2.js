import fs from 'fs';

function getData() {
  return fs.readFileSync('5/input.txt', 'utf8').split("\r\n").map(str => {
    let [ x1, y1, x2, y2 ] = str.split(/,| +-> +/).map(str => parseInt(str));
    return {x1, y1, x2, y2}
  });
}

function drawOnLineMap(lineMap, line) {
  const { x1, y1, x2, y2 } = line;

  const xDir = Math.min(Math.max(x2 - x1, -1), 1);
  const yDir = Math.min(Math.max(y2 - y1, -1), 1);
  const length = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

  for (let i = 0; i <= length; i++) {
    const x = x1 + i * xDir;
    const y = y1 + i * yDir;
    lineMap[`${x} ${y}`] = lineMap[`${x} ${y}`] + 1 | 1;
  }
}

export default function solve() {
  let data = getData();

  // just to quickly key:value positions lineMap['y x']
  let lineMap = {};

  for (const index in data) {
    const line = data[index];
    drawOnLineMap(lineMap, line);
  }

  let count = 0;

  for (const [key, value] of Object.entries(lineMap)) {
    if (value >= 2) {
      count++;
    }
  }

  return (count);
};