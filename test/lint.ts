const lint = require('mocha-tslint');
const configFile = './tslint.json';
const folders = [
  'src',
  'test'
];

lint(configFile, folders);
