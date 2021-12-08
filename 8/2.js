import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('8/input.txt', 'utf8').split("\r\n").map(str => {
    const [signal, output] = str.split(' | ').map(str => str.split(' '));
    return {signal , output, all: [...signal, ...output]}
  });

  return arr;
}

function countIntersections(a, b) {
  return [...a].filter(n => [...b].includes(n)).length;
}

function findNumber(signal, output, all) {
  // Find 1,7,4 & 8
  const n1 = all.find(el => el.length == 2);
  const n4 = all.find(el => el.length == 4);
  const n7 = all.find(el => el.length == 3);

  let number = ''; 
  for (const str of output) {
    if (str.length == 2) number+='1';
    if (str.length == 4) number+='4';
    if (str.length == 3) number+='7';
    if (str.length == 7) number+='8';

    if (str.length == 5) {
      // It can be 2, 3, or 5 
      const i1 = countIntersections(n1, str);
      const i4 = countIntersections(n4, str);
      const i7 = countIntersections(n7, str);

      if (i1 == 1 && i4 == 2 && i7 == 2) number+='2';
      if (i1 == 2 && i4 == 3 && i7 == 3) number+='3';
      if (i1 == 1 && i4 == 3 && i7 == 2) number+='5';
    }

    if (str.length == 6) {
      // It can be 0, 6 or 9
      const i1 = countIntersections(n1, str);
      const i4 = countIntersections(n4, str);
      const i7 = countIntersections(n7, str);

      if (i1 == 2 && i4 == 3 && i7 == 3) number+='0';
      if (i1 == 1 && i4 == 3 && i7 == 2) number+='6';
      if (i1 == 2 && i4 == 4 && i7 == 3) number+='9';
    }
  }

  return parseInt(number); 
}

export default function solve() {
  let data = getData();

  let count = 0;

  for (const { signal , output, all } of data) {
    count += findNumber(signal, output, all);
  }

  return count; // 244 is too low?
};