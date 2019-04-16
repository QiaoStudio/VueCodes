import _ from 'lodash'
import blankImage from 'src/assets/images/invis.png'
if (typeof window !== 'undefined') {
  require('intersection-observer')
}

export const utils = {
  lazyHandler(img, {
    width,
    height
  } = {}) {
    if (!img.originalSrc && img.src) {
      img.classList.add('lazy-loading')
      img.originalSrc = img.src
      img.src = blankImage
      if (!img.getAttribute('width')) {
        img.tempWidth = width || height || 60
        img.setAttribute('width', img.tempWidth)
      }
      if (!img.getAttribute('height')) {
        img.tempHeight = height || width || 60
        img.setAttribute('height', img.tempHeight)
      }
      const io = new IntersectionObserver(records => {
        const e = records[0]
        if (e.isIntersecting) {
          this.restoreImage(e.target)
          io.disconnect()
        }
      }, {
        threshold: [0]
      })
      io.observe(img)
    }
  },
  restoreImage(img) {
    img.onload = img.onerror = () => {
      if (img.tempHeight) {
        img.removeAttribute('height')
        img.tempHeight = undefined
      }
      if (img.tempWidth) {
        img.removeAttribute('width')
        img.tempWidth = undefined
      }
      img.classList.remove('lazy-loading')
    }
    img.src = img.originalSrc
  },
  resetOriginalSrc(img) {
    if (img.src !== blankImage) {
      img.originalSrc = img.src
    }
  }
}

export default {
  name: 'lazy-image',
  inserted(el, binding = {}) {
    if (binding.value === false) {
      return
    }
    if (el.tagName === 'IMG') {
      utils.lazyHandler(el, binding.value)
    } else {
      const images = el.querySelectorAll('img')
      _.forEach(images, img => utils.lazyHandler(img, binding.value))
    }
  },
  componentUpdated(el, binding = {}) {
    if (binding.value === false) {
      return
    }
    if (el.tagName === 'IMG') {
      utils.resetOriginalSrc(el)
    } else {
      const images = el.querySelectorAll('img')
      _.forEach(images, img => utils.resetOriginalSrc(img))
    }
  }
}
