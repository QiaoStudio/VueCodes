export default {
  isElement(el) {
    // Determine if an element is an HTML Element
    return el && el.nodeType === Node.ELEMENT_NODE
  },
  reflow(el) {
    // Cause/wait-for an element to reflow it's content (adjusting it's height/width)
    // requesting an elements offsetHight will trigger a reflow of the element content
    return this.isElement(el) && el.offsetHeight
  },
  onWindowLoad(onLoadFn) {
    if (!window || !document || !onLoadFn) return
    const { readyState } = document

    if (readyState === 'complete' || readyState === 'interactive') onLoadFn()
    else window.addEventListener('load', onLoadFn)
  }
}
