const componentMap = require('../src/component-map.js')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const _ = require('lodash')
let componentObj = {}

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

baseWebpackConfig.entry = {
  app: 'src/main-npm-common.js'
}

_.forEach(componentMap, (value, key) => {
  componentObj[_.kebabCase(key)] = value
})

const webpackConfig = merge.smart(baseWebpackConfig, {
  entry: componentObj,
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: utils.assetsPath('js/[name].js'),
    // Fix issue `window is not defined`
    // reference: https://github.com/webpack/webpack/issues/6642
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    }).concat([{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: utils.cssLoaders({
          sourceMap: true,
          extract: true
        }),
        cssSourceMap: true,
        cacheBusting: config.dev.cacheBusting,
        transformToRequire: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        }
      }
    },{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        publicPath: '../../'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        publicPath: '../../'
      }
    }])
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css')
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
