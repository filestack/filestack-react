const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const rules = require('./webpack.loaders');

const config = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.js'
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx'],
  },
  module: { rules },
  devServer:{
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: process.env.host,
    port: process.env.port,
    contentBase: './dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multistep: true
    }),
  ],
};

module.exports = config;
