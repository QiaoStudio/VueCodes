import { components } from 'src/register'
import Vue from 'vue'
import _ from 'lodash'

Vue.prototype.EventBus = new Vue()

// Screen
Vue.prototype.$screen = Vue.screen = {
  mobile() {
    return false
  },
  tablet() {
    return false
  },
  desktop() {
    return true
  },
  smallScreen() {
    return false
  },
  resize() {
    return 1
  },
  size() {
    return 1366
  }
}

let cs = _.unionBy(components)
cs.map((item) => {
  Vue.use(item)
})

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => { return { matches: true } })
})
Vue.config.silent = true

export default Vue
