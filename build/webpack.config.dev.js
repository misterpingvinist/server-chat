const path = require("path")
const htmlplugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, "..", "src", "client", "index.ts"),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js",".vue"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "dist")
  },
  plugins: [
    new htmlplugin({
      template: path.resolve(__dirname, "..", "static", "index.html")
    }),
    new ExtractTextPlugin("style.css"),
  ]
}
