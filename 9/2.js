import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('9/input.txt', 'utf8').split("\r\n");

  return arr;
}

function getLowPoint(data, x, y) {
  let n = parseInt(data[y][x]);

  const checkTop = y > 0;
  const CheckLft = x > 0;
  const CheckRgt = x < data[y].length;
  const checkBtm = y < data.length - 1;


  const top = (checkTop) ? parseInt(data[y - 1][x]) : Number.MAX_VALUE;
  const lft = (CheckLft) ? parseInt(data[y][x - 1]) : Number.MAX_VALUE;
  const rgt = (CheckRgt) ? parseInt(data[y][x + 1]) : Number.MAX_VALUE;
  const btm = (checkBtm) ? parseInt(data[y + 1][x]) : Number.MAX_VALUE;

  if (top < n) return getLowPoint(data, x, y - 1);
  if (lft < n) return getLowPoint(data, x - 1, y)
  if (rgt < n) return getLowPoint(data, x + 1, y);
  if (btm < n) return getLowPoint(data, x, y + 1);

  return [x, y];
}

export default function solve() {
  let data = getData();

  let basinMap = {};

  for (const y in data) {
    for (const x in data[y]) {
      if (parseInt(data[y][x]) == 9) continue;
      let lowPoint = getLowPoint(data, parseInt(x), parseInt(y));
      basinMap[lowPoint] = [...(basinMap[lowPoint] ? basinMap[lowPoint] : []), [x, y]];
    }
  }

  const pools = Object.values(basinMap)
    .map(arr => arr.length)
    .sort((a, b) => b - a)
    .reduce((a, b, i) => {
      if (i < 3) return a * b;
      return a;
    });
  return pools;
};