import fs from 'fs';

function getData() {
  let [algorithm, image] = fs.readFileSync('20/input.txt', 'utf8').split("\r\n\r\n")

  return {
    algorithm: algorithm.split('\r\n').join(''),
    image: image.split('\r\n')
  }
}

function cloneArr(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function getPixel(algorithm, image, x, y) {
  let value = parseInt(
    [
      // Top left, mid, right
      (image[y - 1] && image[x - 1]) ? image[y - 1][x - 1] : '.',
      (image[y - 1]) ? image[y - 1][x] : '.',
      (image[y - 1] && image[x + 1]) ? image[y - 1][x + 1] : '.',

      // Mid left, mid, right
      (image[x - 1]) ? image[y][x - 1] : '.',
      image[y][x],
      (image[x + 1]) ? image[y][x + 1] : '.',

      // Bottom left, mid, right
      (image[y + 1] && image[x - 1]) ? image[y + 1][x - 1] : '.',
      (image[y + 1]) ? image[y + 1][x] : '.',
      (image[y + 1] && image[x + 1]) ? image[y + 1][x + 1] : '.'
    ]
      .map(char => char == '#' ? '1' : '0')
      .join(''),
    2);

  return algorithm[value];
}

function enhanceImage(algorithm, image) {
  let newImage = cloneArr(image).map(str => str.split(''))

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {
      newImage[y][x] = getPixel(algorithm, image, x, y);
    }
  }

  return newImage.map(arr => arr.join(''));
}

function padArr(arr, char, count) {
  let newArr = []; 
  for (let i = 0; i < count+count+arr.length; i++) {
    newArr.push(Array(count+count+arr[0].length).fill(char))
  }
  arr.forEach((str, y) => {
    str.split('').forEach((char, x) => {
      newArr[count+y][count+x] = char; 
    })
  })

  return newArr.map(arr => arr.join(''));
}

function removePadding(arr, count) {
  return arr.slice(count, -count)
  .map(str => str.slice(count, -count));
}

export default function solve() {
  let { algorithm, image } = getData();

  image = padArr(image, '.', 50);

  for (let i = 0; i < 2; i++) {
    image = enhanceImage(algorithm, image);
  }
  
  image = removePadding(image, 1); // Outsize has artifacts 


  return (image.join('').split('').filter(char => char == '#').length)
};