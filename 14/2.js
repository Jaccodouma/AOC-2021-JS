import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('14/input.txt', 'utf8').split("\r\n\r\n");

  let template = arr[0];
  let pairsArr = arr[1].split("\r\n").map(str => str.split(" -> "));
  let pairs = {};
  pairsArr.forEach(([a, b]) => pairs[a] = b);

  return { template, pairs };
}

function insertPairs(templateMap, pairs) {
  let newMap = {};
  for (const [key, n] of Object.entries(templateMap)) {
    if (pairs[key]) {
      // Insert 
      const a = `${key[0]}${pairs[key]}`;
      const b = `${pairs[key]}${key[1]}`;

      newMap[a] = newMap[a] ? newMap[a] + n : n;
      newMap[b] = newMap[b] ? newMap[b] + n : n;
    } else {
      newMap[key] = templateMap[key] ? templateMap[key] + n : n;
    }
  }
  return newMap;
}

function mapTemplate(template) {
  let templateMap = {};
  for (let i = 0; i < template.length - 1; i++) {
    const key = `${template[i]}${template[i + 1]}`;
    templateMap[key] = templateMap[key] ? templateMap[key] + 1 : 1;
  }
  return templateMap;
}

function countChars(templateMap, template) {
  let charMap = {};

  for (const key of Object.keys(templateMap)) {
    let k = key[0]; // First char of the key
    let n = templateMap[key]; // Number in templateMap
    charMap[k] = charMap[k] ? charMap[k] + n : n;
  }

  // Add last char
  let k = template.slice(-1);
  charMap[k] = charMap[k] ? charMap[k] + 1 : 1;

  return charMap;
}

export default function solve() {
  let { template, pairs } = getData();

  let templateMap = mapTemplate(template);

  for (let i = 0; i < 40; i++) {
    templateMap = insertPairs(templateMap, pairs);
  }

  let elements = countChars(templateMap, template);

  return (Math.max(...Object.values(elements))-Math.min(...Object.values(elements)));
};