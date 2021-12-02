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
  let aim = 0;

  data.forEach(command => {
    switch (command.command) {
      case 'down':
        aim += command.amount;
        break;

      case 'up':
        aim -= command.amount;
        break;

      case 'forward':
        position += command.amount;
        depth += aim*command.amount;
        break;

      default:
        break;
    }
  });

  console.log(position * depth);
};