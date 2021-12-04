import fs from 'fs';

async function run() {
  // Discover all folders
  let days = fs.readdirSync('./', { withFileTypes: true })
    .filter(dir => dir.isDirectory() && !isNaN(dir.name))
    .map(dir => dir.name)
    .sort((e1, e2) => parseInt(e1) - parseInt(e2));

  // Check for js files 
  for await (const day of days) {
    let objs = fs.readdirSync(`./${day}`, { withFileTypes: true }).filter(dir => dir.name.split('.')[1] == 'js').map(dir => dir.name.split('.')[0]);

    for await (const obj of objs) {
      console.log(`Day ${day}.${obj}`);

      const fn = await import(`./${day}/${obj}.js`);
      fn.default();
      console.log();
    }
  };
};

run();
