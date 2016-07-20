var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./base');
var path = require('path');

config.output.filename = '[name].[hash].js';

config.plugins.push(
  new webpack.optimize.DedupePlugin()
);

module.exports = config;
