import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('8/input.txt', 'utf8').split("\r\n").map(str => {
    const [signal, output] = str.split(' | ').map(str => str.split(' '));
    return { signal, output }
  });

  return arr;
}

export default function solve() {
  let data = getData();

  let count = 0;

  for (const { signal, output } of data) {
    for (const str of output) {
      if ([2, 4, 3, 7].includes(str.length)) count++;
    }
  }

  return count; // 244 is too low?
};