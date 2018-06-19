const path = require('path');

module.exports = {
  entry: { 'boot-server': './ClientApp/boot-server.ts' },
  resolve: { 
    extensions: [ '.js', '.ts' ]
  },
  module: {
    rules: [{
      test: /\.ts$/, // include .js files
      enforce: "pre", // preload the jshint loader
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      use: [{
        loader: "ts-loader",
        options: {
         
        }
      }]
    }]
  },
  target: 'node',
  devtool: 'inline-source-map',
  output:  {
    path: path.join(__dirname, './clientApp/dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  }
};