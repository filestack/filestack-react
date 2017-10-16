const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const rules = require('./webpack.loaders');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'filestack-react.js',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json', '.jsx'],
  },
  module: { rules },
  externals: [
    'react', 'filestack-js', 'prop-types'
  ],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
