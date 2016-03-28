'use strict';
const validate = require('git-validate');
const validateUtils = require('git-validate/lib/utils');
const path = require('path');
const cp = require('child_process');
const root = validateUtils.findProjectRoot();

if (process.cwd().match(/node_modules/)) {
  console.log('bypassing coins-validate: installing as sub-dependency');
}

const devPackages = [
  'eslint',
  'eslint-config-airbnb',
  'eslint-plugin-react',
  'gh-pages',
  'jsdoc',
  'istanbul',
  'minami'
];
const lintDirs = 'src/ test/';
const pkgJSON = require(path.resolve(root, 'package.json'));

console.log('installing coins-validate hooks and scripts into your project...');

cp.execSync('rm -f .eslint* .jshintrc .jscsrc', { cwd: root });
validate.copy('templates/.eslintrc.js', '.eslintrc.js');

if (!pkgJSON.scripts) {
  pkgJSON.scripts = {};
}

const scripts = {
  'test': 'istanbul cover test/',
  'lint': 'eslint ' + lintDirs,
  'lintfix': 'eslint --fix ' + lintDirs,
  'validate': 'npm ls',
  'preversion': 'git checkout master && git pull && npm ls',
  'docs': [
    'mkdir -p docs &&',
    'jsdoc -t ./node_modules/minami -d docs -R README.md -r src/'
  ].join(' '),
  'deploy-docs': 'gh-pages -d docs && rm -rf docs',
  'postpublish': 'npm run docs && npm run deploy-docs',
  'publish-patch': 'npm run preversion && npm version patch && git push origin master --tags && npm publish',
  'publish-minor': 'npm run preversion && npm version minor && git push origin master --tags && npm publish',
  'publish-major': 'npm run preversion && npm version major && git push origin master --tags && npm publish',
};

// add scripts if they do not already exist
// user edits to scripts will _not_ be squashed
var scriptValue;
for (var scriptKey in scripts) {
  if (scripts.hasOwnProperty(scriptKey)) {
    scriptValue = scripts[scriptKey];
    if (!pkgJSON.scripts[scriptKey]) {
      validate.installScript(scriptKey, scriptValue);
    }
  }
}

validate.installHooks('pre-commit');
validate.configureHook('pre-commit', [ 'validate', 'lint', 'test' ]);

// install packages into root project package
const installDev = (packages) => {
  cp.exec(
    'npm install --save-dev ' + packages.join(' '),
    { cwd: root },
    (err, stdout, stderr) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log(stdout);
    }
  );
};

const getMissingDevDependencies = (packages) => {
  if (!pkgJSON.devDependencies) {
      return packages;
  }
  if (!packages || !packages.hasOwnProperty('length')) {
      console.warn('no requested devDependency packages detected');
  }
  return packages.filter(function(pkg) {
      return !(pkgJSON.devDependencies && pkgJSON.devDependencies[pkg]);
  });
}

const toInstallDev = getMissingDevDependencies(devPackages);
if (toInstallDev && toInstallDev.length) {
  console.log('installing coins-* ecosystem dep pkgs into your project...');
  installDev(toInstallDev);
} else {
  console.log('project has all coins-* dev packages installed :)');
}
