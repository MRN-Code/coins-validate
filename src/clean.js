'use strict';
const cp = require('child_process');
module.exports = (root) => {
  cp.execSync('rm -f .jshintrc .jscsrc', { cwd: root });
};
