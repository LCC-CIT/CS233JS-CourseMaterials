const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
      index: './src/js/indexStart.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: '[name].bundle.js',
      assetModuleFilename: "images/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: { 
      static: "./dist"
    }, 
    devtool: 'source-map', 
    module: {
      rules: [	
        { 
          test: /\.js$/i,
          exclude: /(node_modules)/,
          use: { 
            loader: 'babel-loader', 
            options: {
            presets: ['@babel/preset-env']
          }}
        }
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/indexStart.html"),
        chunks: ["index"],
        inject: "body",
        filename: "index.html",
      }),
      new copyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/css"),
            to: path.resolve(__dirname, "dist/css"),
          },
          {
            from: path.resolve(__dirname, "src/images"),
            to: path.resolve(__dirname, "dist/images"),
          },
        ],
      }),
    ],
}
  