const path = require('path');
const webpack = require('webpack')
const updateWebpackConfig = require('storybook-readme/env/vue/updateWebpackConfig')
const utils = require('../build/utils')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('../build/webpack.base.conf')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.resolve.alias = Object.assign({}, storybookBaseConfig.resolve.alias, baseWebpackConfig.resolve.alias)

  storybookBaseConfig.module.rules.unshift(createLintingRule())
  storybookBaseConfig.module.rules.push({
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
  })

  storybookBaseConfig.module.rules.push({
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    }
  })

  utils.styleLoaders({
    sourceMap: config.dev.cssSourceMap,
    usePostCSS: true
  }).forEach(rule => {
    storybookBaseConfig.module.rules.push(rule);
  })

  // storybookBaseConfig.plugins.push(new webpack.ProvidePlugin({
  //   jQuery: 'jquery',
  //   $: 'jquery',
  //   "window.jQuery": "jquery"
  // }));

  storybookBaseConfig.plugins.push(new StyleLintPlugin());

  baseWebpackConfig.resolve.modules.forEach(r => {
    storybookBaseConfig.resolve.modules.push(r)
  })

  updateWebpackConfig(storybookBaseConfig)
  // Return the altered config
  return storybookBaseConfig;
};
