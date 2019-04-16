// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'src/dependency'
import { components } from 'src/register'
import Vuex from 'vuex'
import Screen from 'utilities/screen'

const install = function (Vue, opts = {}) {
  Vue.use(Vuex)
  Vue.use(Screen)
  components.forEach(component => {
    Vue.use(component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
