const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config')
const utils = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../ssr-server/dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src/components'),
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'ssr-server': path.resolve(__dirname, '../ssr-server'),
      'components': path.resolve(__dirname, '../src/components'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'fonts': path.resolve(__dirname, '../src/assets/fonts'),
      'elements': path.resolve(__dirname, '../src/components/elements'),
      'modules': path.resolve(__dirname, '../src/components/modules'),
      'widgets': path.resolve(__dirname, '../src/components/widgets'),
      'globals': path.resolve(__dirname, '../src/components/globals'),
      'utilities': path.resolve(__dirname, '../src/utilities'),
      'addon-knobs': path.resolve(__dirname, '../src/stories/mock-knobs')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    }).concat([
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: '[name].[ext]?[hash]'
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
      }
    ])
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery",
      text: ["addon-knobs", "text"],
      select: ["addon-knobs", "select"],
      boolean: ["addon-knobs", "boolean"],
      number: ["addon-knobs", "number"],
      array: ["addon-knobs", "array"],
      date: ["addon-knobs", "date"]
    }),
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    }),
    new VueLoaderPlugin()
  ],
  mode: 'none',
  stats: {
    children: false
  }
}
