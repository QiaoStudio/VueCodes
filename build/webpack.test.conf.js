'use strict'
// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')

const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolve: {
    alias: {
      'unit-test': path.resolve(__dirname, '../test/unit')
    }
  }
})
delete webpackConfig.externals

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
