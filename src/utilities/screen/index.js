import Screen from './screen'
import throttle from 'lodash/throttle'
export default {
  install (Vue) {
    Vue.screen = Screen
    Vue.prototype.$screen = Screen
    Vue.util.defineReactive(Vue.prototype.$screen, 'resize', 1)
    let throttleResize = throttle(() => {
      ++Vue.prototype.$screen.resize
    }, 500)
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', throttleResize)
    }
  }
}
