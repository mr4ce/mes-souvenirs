const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  output: {
    filename: 'static/js/bundle.[fullhash:8].min.js',
    publicPath: '/',
    path: path.resolve(__dirname, process.cwd(), 'build'),
  },
});
