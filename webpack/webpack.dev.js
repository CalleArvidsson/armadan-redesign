const { mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('../helpers/paths');

module.exports = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'prepend',
    },
  },
})(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: paths.dist,
    host: '0.0.0.0',
    port: 8080,
    quiet: true,
    hotOnly: true,
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader'],
      },
    ],
  },
});
