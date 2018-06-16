var webpack = require('webpack');
var	baseConfig = require('./webpack.config.js');

baseConfig.entry = ['webpack-hot-middleware/client', './src/app/app.module.js'];

baseConfig.output.publicPath = '/';

baseConfig.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

module.exports = baseConfig;