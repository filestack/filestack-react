const rules = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.css/,
    loaders: [
      'style-loader',
      'css-loader?modules&importLoaders=1',
    ],
  },
];

module.exports = rules;
