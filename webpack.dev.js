const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://api.jamesmcsweeny.com/dashboard',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  plugins: [
    new DefinePlugin({
      API_ROOT: JSON.stringify('/api')
    })
  ]
});