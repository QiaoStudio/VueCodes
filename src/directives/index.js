import StickyPosition from './sticky-position'

StickyPosition.install = function (Vue) {
  Vue.directive('sticky-position', StickyPosition)
}

export { StickyPosition }
