/*eslint-env node*/
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.make')({ DEV: true });
const appConfig = require('./server/config/environment');
const devServerEntry = ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server'];

config.entry.app = devServerEntry.concat(config.entry.app);

const compiler = webpack(config);

export const server = new WebpackDevServer(compiler, {
  contentBase: './src/',

  hot: true,

  historyApiFallback: true,

  stats: {
    modules: false,
    cached: false,
    colors: true,
    chunk: false
  },
  quiet: false,
  noInfo: false,

  proxy: {
    '/api': {
      target: 'http://localhost:9000',
      secure: false,
    },
    '/auth': {
      target: 'http://localhost:9000',
      secure: false,
    },
    '/primus': {
      target: 'http://localhost:9000',
      secure: false,
      ws: true,
    },
  },
});

/**
 * Starts the dev server
 * @returns {Promise}
 */
export function start() {
  return new Promise(resolve => {
    server.listen(appConfig.clientPort, resolve);
  });
}
