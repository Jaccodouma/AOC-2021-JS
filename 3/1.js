import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('3/input.txt', 'utf8').split("\r\n");

  return arr;
}

export default function solve() {
  let data = getData();

  let count = {};

  // Count amount of '1' bits for each number
  data.forEach(number => {
    for (const i in number) {
      count[i] = count[i] + parseInt(number[i]) || parseInt(number[i]);
    }
  });

  // assemble gamma & epsilon rates by simply checking if the count is over the length of the data 
  // array, placing a '0' or '1' and joining the array then parsing this as an int with base 2 (binary)
  let gammaRate = parseInt(Object.values(count).map(count => (count > data.length/2) ? '1' : '0').join(''),2);
  let epsilonRate = parseInt(Object.values(count).map(count => (count > data.length/2) ? '0' : '1').join(''),2);;

  console.log(gammaRate * epsilonRate);
};