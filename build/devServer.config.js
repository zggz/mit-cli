import path from 'path';

import config from '../config/index.js'

export default {
  client: {
    logging: 'info',
    overlay: config.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    progress: true,
  },
  compress: true,
  allowedHosts: config.allowedHosts.length > 1 ? config.allowedHosts : 'all',
  historyApiFallback: {
    rewrites: [
      { from: /.*/, to: path.posix.join(config.assetsPublicPath, 'index.html') },
    ],
  },
  host: config.host,
  port: config.port,
  open: config.autoOpenBrowser,
  proxy: config.proxyTable || {},
  onListening: function (devServer) {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }

    const port = devServer.server.address().port;
    console.log('Listening on port:', port);
  },
}