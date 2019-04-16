import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import 'src/dependency.js'
import { StickyPosition } from 'src/directives'
import Screen from 'utilities/screen'
import { components } from 'src/register'
Vue.use(Screen)
Vue.use(StickyPosition)
components.forEach(component => {
  Vue.use(component)
})
export function createApp () {
  const router = createRouter()

  const app = new Vue({
    router,
    render: h => h(App)
  })

  return { app, router }
}
