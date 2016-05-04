'use strict';
const uitls = require('./utils');
/**
 * Installs scripts, if and only if they don't already exist (i.e. no squashing)
 */
module.exports = (pkgJSON, scripts) => {
  let scriptValue; // eslint-disable-line
  let scriptKey;
  if (!pkgJSON.scripts) { pkgJSON.scripts = {}; } // eslint-disable-line
  for (scriptKey in scripts) {
    if (scripts.hasOwnProperty(scriptKey)) {
      scriptValue = scripts[scriptKey];
      if (!pkgJSON.scripts[scriptKey]) {
        uitls.installScript(scriptKey, scriptValue);
      }
    }
  }
};
