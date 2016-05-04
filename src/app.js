'use strict';

const utils = require('./utils');
const toInstallScripts = require('./package-scripts');
const toInstallDevPkgs = require('./to-install-dev-packages');
const app = {
  root: utils.findProjectRoot(),
  toInstallScripts: toInstallScripts,
  toInstallDevPkgs: toInstallDevPkgs,
};

Object.assign(app, require('./parse-cli'));

module.exports = app;
