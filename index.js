var validate = require('git-validate');
var validateUtils = require('git-validate/lib/utils');
var execSync = require('child_process').execSync;
var packages = [
    'gh-pages',
    'jsdoc',
    'jshint',
    'jscs',
];
console.log('installing coins-validate hooks into your project...');
validate.copy('templates/.jshintrc', '.jshintrc');
validate.copy('templates/.jscscrc', '.jscsrc');
validate.installScript('lint', 'jscs .');
validate.installScript('postlint', 'jshint .');
validate.installScript('validate', 'npm ls');
validate.installScript('preversion', 'git checkout master && git pull && npm ls');
validate.installScript('docs', 'jsdoc -d docs -r -R README.md src/ && git add docs/*');
validate.installScript('deploy-docs', 'gh-pages -d docs');
validate.installScript('post-publish', 'npm run deploy-docs');
validate.installScript('publish-patch', 'npm run preversion && npm version patch && git push origin master --tags && npm publish');
validate.installScript('publish-minor', 'npm run preversion && npm version minor && git push origin master --tags && npm publish');
validate.installScript('publish-major', 'npm run preversion && npm version major && git push origin master --tags && npm publish');
validate.installHooks('pre-commit');
validate.configureHook('pre-commit', ['validate', 'lint', 'test', 'docs']);

var root = validateUtils.findProjectRoot();
execSync('npm install --save-dev ' + packages.join(' '));
