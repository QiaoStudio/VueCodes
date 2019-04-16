import throttle from 'lodash/throttle'

let screen = {
  mobile: false,
  tablet: false,
  desktop: false,
  smallScreen: false
}

if (typeof window !== 'undefined') {
  let throttleResize = throttle(() => {
    screen.mobile = window.matchMedia('(max-width: 767px)').matches
    screen.tablet = window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches
    screen.desktop = window.matchMedia('(min-width: 992px)').matches
    screen.smallScreen = window.matchMedia('(max-width: 1024px)').matches
    screen.size = window.innerWidth
  }, 500)
  window.addEventListener('resize', throttleResize)
  throttleResize()
}

export default {
  mobile() {
    return screen.mobile
  },
  tablet() {
    return screen.tablet
  },
  desktop() {
    return screen.desktop
  },
  smallScreen() {
    return screen.smallScreen
  },
  size() {
    return screen.size
  }
}
