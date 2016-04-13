'use strict';
const validate = require('git-validate');
const validateUtils = require('git-validate/lib/utils');
const path = require('path');
const root = validateUtils.findProjectRoot();
const copyIfMissing = require('./copy-if-missing');
const clean = require('./clean');
const scripts = require('./package-scripts');
const getMissingDevDependencies = require('./get-missing-dev-deps');
const installDev = require('./install-dev-packages');
const installScripts = require('./install-scripts');
const pkgJSON = require(path.resolve(root, 'package.json'));
const devPackages = [
  'eslint',
  'eslint-config-airbnb',
  'eslint-plugin-react',
  'gh-pages',
  'jsdoc',
  'istanbul',
  'minami',
];

console.log('installing coins-validate hooks and scripts into your project...'); // eslint-disable-line
clean(root);
copyIfMissing('.eslintrc.js', '.eslintrc.js');
installScripts(pkgJSON, scripts);
validate.installHooks('pre-commit');
validate.configureHook('pre-commit', ['validate', 'lint', 'test']);

const toInstallDev = getMissingDevDependencies(pkgJSON, devPackages);
if (toInstallDev && toInstallDev.length) {
  console.log('installing coins-* ecosystem dep pkgs into your project...'); // eslint-disable-line
  installDev(root, toInstallDev);
} else {
  console.log('project has all coins-* dev packages installed :)'); // eslint-disable-line
}
