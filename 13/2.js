import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('13/input.txt', 'utf8').split("\r\n\r\n");

  let dots = arr[0].split("\r\n").map(str => str.split(',').map(Number));
  let folds = arr[1].split("\r\n").map(str => {
      str = str.match(/[x|y]=[0-9]+/)[0].split('=');

      return {
        along: str[0],
        n: parseInt(str[1])
      }
    });

  return { dots, folds };
}

function fold(dots, along, n) {
  let newDots = [];

  if (along == 'y') {
    // FOLD UP 
    for (const dot of dots) {
      if (dot[1] == n) continue; // Fold along 
      let newDot = dot;
      if (dot[1] > n) {
        newDot = ([dot[0], n - (dot[1] - n)]);
      }
      if (!newDots.includes(dot)) newDots.push(newDot);
    }
  } else {
    // FOLD LEFT
    for (const dot of dots) {
      if (dot[0] == n) continue; // Fold along 
      let newDot = dot;
      if (dot[0] > n) {
        newDot = ([n - (dot[0] - n), dot[1]]);
      }
      if (!newDots.includes(dot)) newDots.push(newDot);
    }
  }

  // Filter duplicates
  return newDots.map(arr => arr.join('-')).filter((e, i) => i === newDots.map(arr => arr.join('-')).indexOf(e)).map(str => str.split('-').map(Number));
}

function drawDots(dots) {
  let width = 0; 
  let height = 0; 

  for (const [x,y] of dots) {
    if (x>width) width=x; 
    if (y>height) height=y; 
  }
  
  const dotsStr = dots.map(arr => arr.join('-'));

  for (let y = 0; y <= height; y++) {
    let line = '';
    for (let x = 0; x <= width; x++) {
      if (dotsStr.includes(`${x}-${y}`)) {
        line += "█";
      } else {
        line += " ";
      }
    }
    console.log(line);
  }
}

export default function solve() {
  let { dots, folds } = getData();

  for (const {along, n} of folds) {
    dots = fold(dots, along, n);
  }

  drawDots(dots);

  return 0;
};