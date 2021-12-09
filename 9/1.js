import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('9/input.txt', 'utf8').split("\r\n");

  return arr;
}

function getRiskLevel(data, x, y) {
  const n = parseInt(data[y][x]);

  const checkTop = y > 0;
  const checkBtm = y < data.length - 1;

  const CheckLft = x > 0;
  const CheckRgt = x < data[y].length;

  // Adjacent positions (tl = top left etc.)
  const top = (checkTop) ? parseInt(data[y - 1][x]) : Number.MAX_VALUE;
  const lft = (CheckLft) ? parseInt(data[y][x - 1]) : Number.MAX_VALUE;
  const rgt = (CheckRgt) ? parseInt(data[y][x + 1]) : Number.MAX_VALUE;
  const btm = (checkBtm) ? parseInt(data[y + 1][x]) : Number.MAX_VALUE;

  if (
    ![top, lft, rgt, btm].some(el => el <= n)
  ) return n + 1;

  return 0;
}

export default function solve() {
  let data = getData();

  let riskLevel = 0;

  for (const y in data) {
    for (const x in data[y]) {
      riskLevel += getRiskLevel(data, parseInt(x), parseInt(y));
    }
  }

  return riskLevel;
};