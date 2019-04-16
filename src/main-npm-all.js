// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'src/dependency'
import { components } from 'src/register'
import Vuex from 'vuex'
import Screen from 'utilities/screen'

let registerObj = {}
let VueCodes = {}

let kebabToPascal = (str) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  }).replace(/^(\w)/, function (g) {
    return g[0].toUpperCase()
  })
}

const install = function (Vue, opts = {}) {
  Vue.use(Vuex)
  components.forEach(component => {
    Vue.use(component)
  })
}

const installScreen = function (Vue) {
  Vue.use(Screen)
}

components.forEach(component => {
  registerObj[kebabToPascal(component.name)] = component
})

VueCodes = {
  install
}

registerObj = Object.assign({
  VueCodes,
  installScreen
}, registerObj)

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = registerObj
