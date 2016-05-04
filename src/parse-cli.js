'use strict';

const program = require('commander');
const pkg = require('../package.json');
program
  .version(pkg.version)
  .option('-r, --root [root]', 'squash project root')
  .parse(process.argv);

module.exports = program;
