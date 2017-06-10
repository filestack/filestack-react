const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const rules = require('./webpack.loaders');

module.exports = [{
  entry: './src/ReactFilestack',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-filestack.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json', '.jsx'],
  },
  module: { rules },
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
        warnings: true,
      },
    }),
  ],
}, {
  entry: './examples/demo/demo.jsx',
  output: {
    path: path.join(__dirname, 'examples/demo/dist'),
    filename: 'demo.js'
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'examples/demo'],
    extensions: ['.json', '.js', '.jsx'],
  },
  module: { rules },
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
}];
