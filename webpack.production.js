const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      API_ROOT: JSON.stringify('https://api.jamesmcsweeny.com/dashboard')
    })
  ]
});