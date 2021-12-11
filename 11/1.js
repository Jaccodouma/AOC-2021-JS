import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('11/input.txt', 'utf8').split("\r\n").map(str => str.split('').map(Number));

  return arr;
}

function increaseAll(data, n) {
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      data[y][x] += n;
    }
  }
}

function increaseAdjacentValues(data, y, x) {
  const checkTop = y > 0;
  const checkBtm = y < data.length - 1;

  const checkLft = x > 0;
  const checkRgt = x < data[y].length - 1;


  if (checkTop && checkLft) data[y - 1][x - 1] = data[y - 1][x - 1] + 1;
  if (checkTop) data[y - 1][x] = data[y - 1][x] + 1;
  if (checkTop && checkRgt) data[y - 1][x + 1] = data[y - 1][x + 1] + 1;

  if (checkLft) data[y][x - 1] = data[y][x - 1] + 1;
  if (checkRgt) data[y][x + 1] = data[y][x + 1] + 1;

  if (checkBtm && checkLft) data[y + 1][x - 1] = data[y + 1][x - 1] + 1;
  if (checkBtm) data[y + 1][x] = data[y + 1][x] + 1;
  if (checkBtm && checkRgt) data[y + 1][x + 1] = data[y + 1][x + 1] + 1;
}

function clampAllTo0(data) {
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      if (data[y][x] < 0) data[y][x] = 0;
    }
  }
}

function simulateStep(data) {
  let prevFlashes = -1000;
  let flashes = 0;

  // Increase all by 1 
  increaseAll(data, 1);

  while (flashes > prevFlashes) {
    prevFlashes = flashes;

    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[0].length; x++) {
        // Flash if > 9, set to low number
        if (data[y][x] > 9) {
          flashes++;

          data[y][x] = -99999;

          // Increase adjacent values 
          increaseAdjacentValues(data, y, x);
        }
      }
    }
  }
  
  clampAllTo0(data);

  return flashes;
}

export default function solve() {
  let data = getData();

  let flashes = 0;

  for (let i = 0; i < 100; i++) {
    flashes += simulateStep(data);
  }

  return flashes;
};