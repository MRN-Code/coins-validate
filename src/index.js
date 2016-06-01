'use strict';

/**
 * @module coins-validate
 */

const app = require('./app');
const utils = require('./utils');
const path = require('path');
const copyIfMissing = require('./copy-if-missing');
const clean = require('./clean');
const getMissingDevDependencies = require('./get-missing-dev-deps');
const installDev = require('./install-dev-packages');
const installScripts = require('./install-scripts');
const pkgJSON = require(path.resolve(app.root, 'package.json'));

console.log('installing coins-validate hooks and scripts into your project...'); // eslint-disable-line
clean(app.root);
copyIfMissing(
  path.resolve(__dirname, '../templates/.eslintrc.js'),
  path.resolve(app.root, '.eslintrc.js')
);
copyIfMissing(
  path.resolve(__dirname, '../templates/.jsdoc.json'),
  path.resolve(app.root, '.jsdoc.json')
);
installScripts(pkgJSON, app.toInstallScripts);
utils.installHooks('pre-commit');
utils.configureHook('pre-commit', ['validate', 'lint', 'test']);

const toInstallDev = getMissingDevDependencies(pkgJSON, app.toInstallDevPkgs);
if (toInstallDev && toInstallDev.length) {
  console.log('installing coins-* ecosystem dep pkgs into your project...'); // eslint-disable-line
  installDev(app.root, toInstallDev);
} else {
  console.log('project has all coins-* dev packages installed :)'); // eslint-disable-line
}
