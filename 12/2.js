import fs from 'fs';
import path from 'path';

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
    for (const nextCave of map[currentCave]) {
      if (
        // If there's already a double small cave visit, skip
        nextCave.match(/[a-z]+/g)
        &&
        (
          hasDuplicates(visitedCaves.filter(cave => cave.match(/[a-z]+/g)))
          && currentPath.includes(nextCave)
        )
      ) continue;
      if (nextCave == 'start') continue;
      foundPaths = findPaths(map, nextCave, visitedCaves, foundPaths, currentPath);
    }
  }
  return foundPaths;
}

function createMap(data) {
  // contains key: connectedTo[]
  const map = {};

  for (const edge of data) {
    if (map[edge[0]]) {
      map[edge[0]].push(edge[1]);
    } else {
      map[edge[0]] = [edge[1]];
    }

    if (map[edge[1]]) {
      map[edge[1]].push(edge[0]);
    } else {
      map[edge[1]] = [edge[0]];
    }
  }

  return map;
}

function hasDuplicates(arr) {
  return arr.filter((str, i) => arr.indexOf(str) != i).length > 0
}

export default function solve() {
  let data = getData();

  const map = createMap(data);

  const paths = findPaths(map);

  return paths.length;
};