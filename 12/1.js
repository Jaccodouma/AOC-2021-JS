import fs from 'fs';

function getData() {
  let arr = fs.readFileSync('12/input.txt', 'utf8').split("\r\n").map(str => str.split('-'));

  return arr;
}

function findPaths(
  map,
  currentCave = 'start',
  visitedCaves = [],
  foundPaths = [],
  currentPath = []
) {
  visitedCaves = [...visitedCaves];
  foundPaths = [...foundPaths];
  currentPath = [...currentPath];

  visitedCaves.push(currentCave);
  currentPath.push(currentCave);

  if (currentCave == 'end') {
    foundPaths.push(currentPath);
  } else {
    for (const cave of map[currentCave]) {
      if (visitedCaves.includes(cave) && cave.match(/[a-z]+/g)) continue;
      foundPaths = findPaths(map, cave, visitedCaves, foundPaths, currentPath);
    }
  }
  return foundPaths;
}

function createMap(data) {
  // contains key: connectedTo[]
  const map = {};

  for (const edge of data) {
    if (edge[1] != 'start' || edge[0] != 'end') {
      if (map[edge[0]]) {
        map[edge[0]].push(edge[1]);
      } else {
        map[edge[0]] = [edge[1]];
      }
    }

    if (edge[0] != 'start' || edge[1] != 'end') {
      if (map[edge[1]]) {
        map[edge[1]].push(edge[0]);
      } else {
        map[edge[1]] = [edge[0]];
      }
    }
  }

  return map;
}

export default function solve() {
  let data = getData();

  const map = createMap(data);

  const paths = findPaths(map);

  return paths.length;
};