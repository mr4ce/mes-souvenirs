const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    disableHostCheck: true,
  },
})
