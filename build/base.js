var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/main/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../public/static'),
    publicPath: './static/',
    filename: 'bundle.js'
  },
  module: {
		preLoaders: [{
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: 'stylelint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.scss$/,
      //loader: ExtractTextPlugin.extract('css!sass')
      loader: 'style!css!postcss!sass'
    }, {
      test: /\.html$/,
      loader: 'vue-html-loader?interpolate'
    }, {
      test: /\.(jpeg|jpg|png|gif|svg|eot|woff|ttf)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  plugins: [
		new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'dev',
      __PRERELEASE__: process.env.NODE_ENV === 'prod'
		}),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve(__dirname, '../src/main/index.html')
    })
	],
  postcss: function () {
    return [autoprefixer];
  },
	stylelint: {
    configFile: path.resolve(__dirname, '../.stylelint.js'),
    displayOutput: true,
    ignoreCache: true
  },
  eslint: {
    configFile: path.resolve(__dirname, '../.eslintrc')
  }
}
