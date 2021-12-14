import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('14/input.txt', 'utf8').split("\r\n\r\n");

  let template = arr[0];
  let pairsArr = arr[1].split("\r\n").map(str => str.split(" -> "));
  let pairs = {};
  pairsArr.forEach(([a, b]) => pairs[a] = b);

  return { template, pairs };
}

function insertPairs(template, pairs) {
  let newTemplate = "";
  for (let i = 0; i < template.length - 1; i++) {
    newTemplate += template[i];
    if (pairs[`${template[i]}${template[i + 1]}`]) {
      newTemplate += pairs[`${template[i]}${template[i + 1]}`];
    }
  }
  newTemplate += template[template.length - 1];
  return newTemplate;
}

function countChars(string) {
  let charMap = {};

  for (const char of [...string]) {
    charMap[char] = charMap[char] ? charMap[char] + 1 : 1;
  }

  return charMap;
}

export default function solve() {
  let { template, pairs } = getData();


  for (let i = 0; i < 10; i++) {
    template = insertPairs(template, pairs);
  }

  let elements = countChars(template);

  return (Math.max(...Object.values(elements)) - Math.min(...Object.values(elements)));
};