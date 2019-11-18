require('dotenv').config()
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const webpack = require('webpack')

module.exports = withCSS({
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader'
      }
    })
    return config
  }
})