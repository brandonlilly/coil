var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


var config = {
  entry: [
    './src/index.js',
  ],
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js'],
    root: [ path.join(__dirname, 'src/') ],
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel', exclude: /node_modules/,
        query: { presets: ['es2015', 'stage-0'] }
      },
    ]
  },
  plugins: [
  new webpack.IgnorePlugin(/\.(css|less)$/),
  new webpack.BannerPlugin('require("source-map-support").install();',
                           { raw: true, entryOnly: false })
  ],
  devtool: 'sourcemap'
};

module.exports = config;
