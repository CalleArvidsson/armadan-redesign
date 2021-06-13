const path = require('path');

const PATH_SRC = path.join(__dirname, '..', './src');
const PATH_DIST = path.join(__dirname, '..', './dist');
const PATH_PUBLIC = path.join(__dirname, '..', './public');

module.exports = {
  src: PATH_SRC,
  dist: PATH_DIST,
  appEntry: path.join(PATH_SRC, './index.tsx'),
  templateHtml: path.join(PATH_PUBLIC, './index.html'),
  srcPublic: PATH_PUBLIC,
  distPublic: path.join(PATH_DIST, './public'),
  aliases: {
    images: path.resolve(__dirname, '../assets/images'),
    components: path.resolve(__dirname, '../src/components'),
    contexts: path.resolve(__dirname, '../src/contexts'),
    relay: path.resolve(__dirname, '../src/relay'),
    services: path.resolve(__dirname, '../src/services'),
    views: path.resolve(__dirname, '../src/views'),
    common: path.resolve(__dirname, '../src/common'),
    mutations: path.resolve(__dirname, '../src/mutations'),
    types: path.resolve(__dirname, '../src/types'),
    hooks: path.resolve(__dirname, '../src/hooks'),
  },
};
