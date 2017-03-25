const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const rules = [
  { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
  {
    test: /\.css/,
    use: [
      'style-loader?sourcemap', 'css-loader?modules&importLoaders=1',
    ],
  },
];

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
        warnings: false,
      },
    }),
  ],
}, {
  entry: './src/demo.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.js'
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'src'],
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
