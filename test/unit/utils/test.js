import * as VueTestUtils from '@vue/test-utils'

Object.keys(VueTestUtils).forEach(key => {
  exports[key] = VueTestUtils[key]
})
