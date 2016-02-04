# coins-validate

COINS implementation of nfl's [git-validate](https://github.com/nlf/git-validate)

Specifically, this package does the following to your project:
  - installs common npm scripts (e.g. `"test": "node test/", "validate": "npm ls"`)
  - installs common pre-commit hooks (e.g. lint, test, docs)
  - installs packages that required for the above tasks to be successful

This module also is OK with you deviating your own packages requirements as you see fit.  On re-install or update, it will cordially NOT squash your modified scripts.  It will, however, continue to install dev dependencies that COINS thinks are mandatory!

# usage

`npm i --save-dev coins-validate@latest`

always use latest to assert that coins repos always follow our latest spec
