var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var config = require('./base');
var path = require('path');

webpack.debug = true;

config.devtool = 'eval-source-map';

config.eslint.emitError = true;
config.eslint.emitWarning = true;

config.plugins.push(
  new BrowserSyncPlugin({
    proxy: 'localhost:3000',
    port: 4000
  })
);


module.exports = config;
