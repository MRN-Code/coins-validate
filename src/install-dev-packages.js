'use strict';
const cp = require('child_process');
module.exports = (root, packages) => {
  cp.exec(
    'npm install --save-dev ' + packages.join(' '), // eslint-disable-line
    { cwd: root },
    (err, stdout, stderr) => { // eslint-disable-line
      if (err) { throw err; }
      console.log(stdout); // eslint-disable-line
    }
  );
};
