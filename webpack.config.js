const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
module.exports = {
  context: path.resolve(__dirname, "./"),
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    open: true,
    compress: true,
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  module:{
    rules:[
      {
        test: /\.mp4$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      template: "./public/index.html",
    }),
  ],
};
