const lintDirs = 'src/ test/';
module.exports = {
  'test': 'nyc node test/', // eslint-disable-line
  'postest': 'nyc check-coverage --lines 95 --functions 95 --branches 95', // eslint-disable-line
  'lint': 'eslint ' + lintDirs, // eslint-disable-line
  'lintfix': 'eslint --fix ' + lintDirs, // eslint-disable-line
  'validate': 'npm ls', // eslint-disable-line
  'preversion': 'git checkout master && git pull && npm ls', // eslint-disable-line
  'docs': [ // eslint-disable-line
    'mkdir -p docs &&',
    'jsdoc -c .jsdoc.json src/',
  ].join(' '),
  'deploy-docs': 'gh-pages -d docs && rm -rf docs',
  'postpublish': 'npm run docs && npm run deploy-docs', // eslint-disable-line
  'publish-patch': 'npm run preversion && npm version patch && git push origin master --tags && npm publish', // eslint-disable-line
  'publish-minor': 'npm run preversion && npm version minor && git push origin master --tags && npm publish', // eslint-disable-line
  'publish-major': 'npm run preversion && npm version major && git push origin master --tags && npm publish', // eslint-disable-line
};
