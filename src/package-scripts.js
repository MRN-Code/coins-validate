const lintDirs = 'src/ test/';
module.exports = {
  'test': 'nyc --reporter=lcov --check-coverage --functions=90 --branches=90 node test/', // eslint-disable-line
  'lint': 'eslint ' + lintDirs, // eslint-disable-line
  'lintfix': 'eslint --fix ' + lintDirs, // eslint-disable-line
  'validate': 'npm ls', // eslint-disable-line
  'preversion': 'git checkout master && git pull && npm ls', // eslint-disable-line
  'publish-patch': 'npm run preversion && npm version patch && git push origin master --tags && npm publish', // eslint-disable-line
  'publish-minor': 'npm run preversion && npm version minor && git push origin master --tags && npm publish', // eslint-disable-line
  'publish-major': 'npm run preversion && npm version major && git push origin master --tags && npm publish', // eslint-disable-line
};
