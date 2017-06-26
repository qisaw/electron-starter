const { spawn } = require('child_process');
const path = require('path');

const { env } = process
const environment = Object.assign({
  NODE_ENV: "dev",
}, env );

const runElectron = () => spawn("npm", [ "run", "electron"], { env: environment });
const runWebpack = () => spawn("npm", [ "run", "dev-server" ], { env: environment });
const logEverything = child => {
  child.stdout.on('data', d => process.stdout.write(d.toString()));
  child.stderr.on('data', d => process.stderr.write(d.toString()));
  child.on('error', d => console.log(d.toString()));
  return child;
}

let electron;
let webpack;

const stopEverything = () => {
  process.stdout.write('\nEXITTING EVERYTHING\n');
  if(webpack) {
    webpack.removeAllListeners('exit');
    webpack.kill();
  }
  if(electron) {
    electron.removeAllListeners('exit');
    electron.kill();
  }
  process.exit();
}

webpack = logEverything(runWebpack());

webpack.stdout.on('data', d => {
  if(d.toString().match(/Compiled successfully/) && !electron) {
    electron = logEverything(runElectron());
    electron.on('exit', stopEverything)
  }
});

// kill them all if user kills this process
const signals = ['SIGINT', 'SIGTERM' ];
signals.forEach(signal => { process.on(signal, stopEverything) });

