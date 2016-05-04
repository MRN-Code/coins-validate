'use strict';

const utils = require('./utils');
const fs = require('fs');

module.exports = (src, dest) => {
  try {
    fs.lstatSync(dest);
    console.log(`${dest} already present, skipping`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`writing ${dest}`);
      utils.copyFile(src, dest);
    } else {
      throw err;
    }
  }
};
