const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_ROOT: "https://localhost:5001",
    }),
  ],
});
