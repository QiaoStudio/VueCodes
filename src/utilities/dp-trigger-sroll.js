let scrollTop = 0
let scrollNum = 0
let body = typeof document === 'undefined' || document.querySelector('body')

let dpTriggerSroll = {
  open: function () {
    scrollNum = scrollNum + 1
    if (scrollNum <= 1) {
      scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      body.classList.add('dp-trigger-sroll')
      body.style.top = -scrollTop + 'px'
    }
  },
  close: function () {
    scrollNum = scrollNum - 1 > 0 ? scrollNum - 1 : 0
    if (scrollNum < 1) {
      body.classList.remove('dp-trigger-sroll')
      document.documentElement.scrollTop = scrollTop
      document.body.scrollTop = scrollTop
      body.style.top = ''
    }
  }
}
export default dpTriggerSroll
