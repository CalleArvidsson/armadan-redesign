const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  // plugins: [new BundleAnalyzerPlugin()],
});
