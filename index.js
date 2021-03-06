import fs from 'fs';

/**
 * To run: 
 *  `node index`
 * To run a specific day: 
 *  `node index <day>`
 * To run nodemon on a specific day: 
 *  `nodemon index.js <day>`
 */

async function run() {
  let currentDay = process.argv[2];

  // Discover all folders
  let days = fs.readdirSync('./', { withFileTypes: true })
    .filter(dir => dir.isDirectory() && !isNaN(dir.name))
    .map(dir => dir.name)
    .sort((e1, e2) => parseInt(e1) - parseInt(e2));

  // Check for js files 
  for await (const day of days) {
    let objs = fs.readdirSync(`./${day}`, { withFileTypes: true }).filter(dir => dir.name.split('.')[1] == 'js').map(dir => dir.name.split('.')[0]);

    if (currentDay && day != currentDay) continue; 

    for await (const obj of objs) {
      
      const fn = await import(`./${day}/${obj}.js`);

      let t = process.hrtime();
      const answer = fn.default();
      t = process.hrtime(t);

      console.log(`Day ${day}.${obj} (${(t[1]/1000000).toFixed(2)}ms)`);
      console.log(answer);
      console.log();
    }
  };
};

run();
