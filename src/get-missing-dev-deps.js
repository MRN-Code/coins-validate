'use strict';

const getMissingDevDependencies = (pkgJSON, packages) => {
  if (!pkgJSON.devDependencies) { return packages; }
  if (!packages || !packages.hasOwnProperty('length')) {
    console.warn('no devDependency packages requested'); // eslint-disable-line
  }
  return packages.filter((pkg) => { // eslint-disable-line
    return !(pkgJSON.devDependencies && pkgJSON.devDependencies[pkg]);
  });
};

module.exports = getMissingDevDependencies;
