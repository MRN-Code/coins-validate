var validate = require('git-validate');
console.log('installing coins-validate hooks into your project...')
validate.copy('templates/.jshintrc', '.jshintrc');
validate.copy('templates/.jscscrc', '.jscsrc');
validate.installScript('lint', 'jscs .');
validate.installScript('postlint', 'jshint .');
validate.installScript('validate', 'npm ls');
validate.installScript('preversion', 'git checkout master && git pull && npm ls');
validate.installScript('publish-patch', 'npm run preversion && npm version patch && git push origin master --tags && npm publish');
validate.installScript('publish-minor', 'npm run preversion && npm version minor && git push origin master --tags && npm publish');
validate.installScript('publish-major', 'npm run preversion && npm version major && git push origin master --tags && npm publish');
