import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('5/input.txt', 'utf8').split("\r\n").map(str => {
    // str = '881,570 -> 373,570'
    let arr = str.split(/,| +-> +/).map(str => parseInt(str));
    return {
      x1: parseInt(arr[0]),
      y1: parseInt(arr[1]),
      x2: parseInt(arr[2]),
      y2: parseInt(arr[3])
    }
  });

  return arr;
}

function isHorizontal(line) {
  return (line.x1 == line.x2 || line.y1 == line.y2);
}

export default function solve() {
  let data = getData();

  // just to quickly key:value positions lineMap['y x']
  let lineMap = {};

  for (const index in data) {
    const line = data[index];
    const { x1, y1, x2, y2 } = line;
    if (!isHorizontal(line)) continue; // skip non horizontal lines

    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        lineMap[`${x} ${y}`] = lineMap[`${x} ${y}`] + 1 | 1;
      }
    }
  }

  let count = 0; 

  for (const [key, value] of Object.entries(lineMap)) {
    if (value>=2) {
      count++; 
    }
  }

  console.log(count);
};