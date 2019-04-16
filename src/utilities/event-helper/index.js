export const attachEvent = (element, eventName, eventHandler) => {
  if (element.removeEventListener) {
    element.removeEventListener(eventName, eventHandler)
  } else if (element.detachEvent) {
    element.detachEvent('on' + eventName, eventHandler)
  }
  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false)
    return true
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, eventHandler)
    return true
  } else {
    // nothing to do, browser too old or non standard anyway
    return false
  }
}
