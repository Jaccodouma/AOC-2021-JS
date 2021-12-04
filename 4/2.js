import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('4/input.txt', 'utf8').split("\r\n\r\n");

  let numbers = arr[0].split(',').map(s => parseInt(s));

  // Boards becomes an array of objects: {board[][], drawn[][]}
  let boards = arr.splice(1).map(str => {
    // split each board string up into a 2d array with numbers
    let board = str.split("\r\n").map(str => str.trim().split(/ +/).map(str => parseInt(str)));
    // create a corresponding 2d array with booleans, indicating whether the corresponding number has been drawn
    let drawn = board.map(arr => arr.map(n => false));
    return { board, drawn, bingo: false };
  });

  return {
    numbers,
    boards
  };
}

function drawNumber(drawnNumber, boards) {
  // For each board 
  for (const index in boards) {
    const { board, drawn, bingo } = boards[index];

    if (bingo) continue; 

    // Fill in the number
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (board[y][x] == drawnNumber) {
          drawn[y][x] = true;
        }
      }
    }

    if (hasBingo(drawn)) {
      boards[index].bingo = true;
      losingBoard = findAnswer(board, drawn, drawnNumber);
    }
  }
}

function findAnswer(board, drawn, drawnNumber) {
  let total = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (!drawn[y][x]) {
        total += board[y][x];
      }
    }
  }
  return total * drawnNumber;
}

function hasBingo(drawn) {
  // check rows
  for (let y = 0; y < 5; y++) {
    const row = drawn[y];
    if (!row.some(element => { return !element })) {
      return true;
    }
  }

  // check columns
  const rotatedDrawn = rotate2DArray(drawn);
  for (let y = 0; y < 5; y++) {
    const row = rotatedDrawn[y];
    if (!row.some(element => !element)) {
      return true;
    }
  }
  return false;
}

function rotate2DArray(array) {
  return array[0].map((val, index) => array.map(row => row[index]).reverse())
}

let losingBoard = {};

export default function solve() {
  let { numbers, boards } = getData();


  for (const index in numbers) {
    const drawnNumber = numbers[index];
    drawNumber(drawnNumber, boards);
  }

  console.log(losingBoard);
};