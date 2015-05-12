var process = require('child_process'),
    execSync = process.execSync;

var revision = execSync('git rev-parse HEAD');

console.log(revision);