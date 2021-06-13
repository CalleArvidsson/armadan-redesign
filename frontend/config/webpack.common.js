const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: {
    app: paths.appEntry,
  },
  output: {
    path: paths.dist,
    filename: 'js/[name].[chunkhash].js',
    assetModuleFilename: 'images/[hash][ext]',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ...paths.aliases,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.templateHtml,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.srcPublic,
          to: paths.dist,
          filter: (resourcePath) => !/index.html$/.test(resourcePath),
        },
      ],
    }),
  ],
};
