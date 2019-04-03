const componentMap = require('./component-map.js')
let components = []
for (let key in componentMap) {
  components.push(require('./components/' + componentMap[key]).default)
}

export { components }
