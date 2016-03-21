module.exports = {
  ecmaFeatures: {
    modules: false, // https://github.com/eslint/eslint/issues/2785#issuecomment-113254153
  },
  extends: 'airbnb',
  env: {
    node: true,
    commonjs: true,
    mocha: true,
    es6: true
  }
}
