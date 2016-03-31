'use strict';
const validateUtils = require('git-validate/lib/utils');
const validate = require('git-validate');
const path = require('path');
const fs = require('fs');

module.exports = (src, dest) => {
  const root = validateUtils.findProjectRoot();
  try {
    const destPath = path.resolve(root, dest);
    fs.lstatSync(destPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      validate.copy(src, dest);
    } else {
      throw err;
    }
  }
};
