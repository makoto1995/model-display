/*eslint-env node*/
/**
 * Webpack config for tests
 */
module.exports = require('./webpack.make')({
  BUILD: false,
  TEST: true,
  DEV: false
});
