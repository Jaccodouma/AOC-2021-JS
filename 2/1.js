import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('2/input.txt', 'utf8').split("\r\n").map(str => {
    const commands = str.split(' ');
    return {
      command: commands[0],
      amount: parseInt(commands[1])
    };
  });

  return arr;
}

export default function solve() {
  let data = getData();

  let position = 0;
  let depth = 0;

  data.forEach(command => {
    switch (command.command) {
      case 'up':
        depth -= command.amount;
        break;

      case 'down':
        depth += command.amount;
        break;

      case 'forward':
        position += command.amount;
        break;

      default:
        break;
    }
  });

  return (position*depth);
};