import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('1/input.txt', 'utf8').split("\r\n").map(str => parseInt(str));

  return arr;
}

export default function solve() {
  let data = getData();

  console.log(data);
};