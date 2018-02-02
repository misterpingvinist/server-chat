const path = require("path")
const htmlplugin = require("html-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "..", "src", "client", "index.ts"),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "dist")
  },
  plugins: [
    new htmlplugin({
      template: path.resolve(__dirname, "..", "static", "index.html")
    })
  ]
}
