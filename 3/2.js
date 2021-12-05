import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('3/input.txt', 'utf8').split("\r\n");

  return arr;
}

function findOxygenRating(data) {
  let input = [...data];
  for (const bitCriteriaIndex in input[0]) { // for each index in each 'byte'
    // Count most existing bit 
    let mostExistingBit = (input.filter(byte => byte[bitCriteriaIndex] == '1').length >= input.length / 2) ? '1' : '0';

    // discard numbers 
    const newInput = input.filter(byte => byte[bitCriteriaIndex] == mostExistingBit);

    if (newInput.length == 1) {
      return newInput[0];
    } else if (newInput.length == 0) {
      return input[input.length];
    }

    input = newInput;
  }
}

function findScrubberRating(data) {
  let input = [...data];
  for (const bitCriteriaIndex in input[0]) { // for each index in each 'byte'
    // Count most existing bit 
    let mostExistingBit = (input.filter(byte => byte[bitCriteriaIndex] == '1').length >= input.length / 2) ? '0' : '1';

    // discard numbers 
    const newInput = input.filter(byte => byte[bitCriteriaIndex] == mostExistingBit);

    if (newInput.length == 1) {
      return newInput[0];
    } else if (newInput.length == 0) {
      return input[input.length];
    }

    input = newInput;
  }
}

export default function solve() {
  let data = getData();

  let oxygenRating = parseInt(findOxygenRating(data), 2);
  let scrubberRating = parseInt(findScrubberRating(data), 2);

  return (oxygenRating * scrubberRating);
};