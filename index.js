var validate = require('git-validate');
var validateUtils = require('git-validate/lib/utils');
var path = require('path');
var cp = require('child_process');
var root = validateUtils.findProjectRoot();
var packages = [
    'gh-pages',
    'jsdoc',
    'jshint',
    'jscs',
];
var lintDirs = 'src/ test/';

var projPkg = require(path.resolve(root, 'package.json'));
console.log('installing coins-validate hooks and scripts into your project...');

cp.execSync('rm -f .jshintrc .jscsrc', { cwd: root });
validate.copy('templates/.jshintrc', '.jshintrc');
validate.copy('templates/.jscsrc', '.jscsrc');

if (!projPkg.scripts || !projPkg.scripts['test']) validate.installScript('test', 'node test/');
if (!projPkg.scripts || !projPkg.scripts['lint']) validate.installScript('lint', 'jscs ' + lintDirs);
if (!projPkg.scripts || !projPkg.scripts['lintfix']) validate.installScript('lintfix', 'jscs --fix ' + lintDirs);
if (!projPkg.scripts || !projPkg.scripts['postlint']) validate.installScript('postlint', 'jshint ' + lintDirs);
if (!projPkg.scripts || !projPkg.scripts['validate']) validate.installScript('validate', 'npm ls');
if (!projPkg.scripts || !projPkg.scripts['preversion']) validate.installScript('preversion', 'git checkout master && git pull && npm ls');
if (!projPkg.scripts || !projPkg.scripts['docs']) validate.installScript('docs', 'jsdoc -d docs -r -R README.md src/ && git add docs/* && git commit -m "stage docs" && git push');
if (!projPkg.scripts || !projPkg.scripts['deploy-docs']) validate.installScript('deploy-docs', 'gh-pages -d docs');
if (!projPkg.scripts || !projPkg.scripts['postpublish']) validate.installScript('postpublish', 'npm run docs && npm run deploy-docs');
if (!projPkg.scripts || !projPkg.scripts['publish-patch']) validate.installScript('publish-patch', 'npm run preversion && npm version patch && git push origin master --tags && npm publish');
if (!projPkg.scripts || !projPkg.scripts['publish-minor']) validate.installScript('publish-minor', 'npm run preversion && npm version minor && git push origin master --tags && npm publish');
if (!projPkg.scripts || !projPkg.scripts['publish-major']) validate.installScript('publish-major', 'npm run preversion && npm version major && git push origin master --tags && npm publish');
validate.installHooks('pre-commit');
validate.configureHook('pre-commit', ['validate', 'lint', 'test']);

// installs packages into root project package
var installDev = function(packages) {
    cp.exec('npm install --save-dev ' + packages.join(' '), { cwd: root }, function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
};

getMissingDevDependencies = function(packages) {
    if (!projPkg.devDependencies) {
        return packages;
    }
    if (!packages || !packages.hasOwnProperty('length')) {
        console.warn('no requested devDependency packages detected');
    }
    return packages.filter(function(pkg) {
        return !(projPkg.devDependencies && projPkg.devDependencies[pkg]);
    });
}

var toInstall = getMissingDevDependencies(packages);
if (toInstall && toInstall.length) {
    console.log('installing coins-* ecosystem dep pkgs into your project...');
    installDev(toInstall);
} else {
    console.log('project has all coins-* dev packages installed :)');
}
