import { KEY_VALUES, getKey } from 'utilities/event-helper/key-event'
const DEFAULT_SETTING_FOR_LIST = {
  itemSelector: null,
  backwardKeys: [],
  forwardKeys: [],
  selectKeys: [KEY_VALUES.ENTER, KEY_VALUES.SPACE],
  dismissKeys: [KEY_VALUES.ESCAPE],
  onFocus: null,
  onSelect: null,
  onDismiss: null
}
const depthOf = (element, root) => {
  let depth = 0
  let current = element
  while (current != null && current !== root) {
    depth++
    current = current.parentElement
  }
  return depth
}
export const KeyboardInteractionForList = {
  data() {
    return {
      $_KFL_focusedElement: null
    }
  },
  computed: {
    $_KFL_settings() {
      return {
        ...DEFAULT_SETTING_FOR_LIST,
        ...this.keyboardSettings
      }
    }
  },
  methods: {
    $_KFL_getFocusedElement() {
      const focusedElement = document.activeElement
      let item = this.$el.querySelector(this.$_KFL_settings.itemSelector)
      return depthOf(focusedElement, this.$el) === depthOf(item, this.$el) ? focusedElement : null
    },
    $_KFL_findNextFocusable(step) {
      const focusableList = this.$_KFL_getFocusableList()
      if (focusableList.length <= 1) {
        return { focus: () => {} }
      }
      let currentIdx = -1
      const focusedElement = this.$_KFL_getFocusedElement()
      for (let index in focusableList) {
        if (focusableList[index] === focusedElement) {
          currentIdx = Number.parseInt(index)
        }
      }
      let potentialNext = currentIdx + step
      let nextFocus
      if (potentialNext < 0) {
        nextFocus = focusableList[focusableList.length - 1]
      } else if (potentialNext === focusableList.length) {
        nextFocus = focusableList[0]
      } else {
        nextFocus = focusableList[potentialNext]
      }
      return {
        focus: () => this.$_KFL_focus(nextFocus)
      }
    },
    $_KFL_updateTabIndex() {
      const focusableList = this.$_KFL_getFocusableList()
      const focusedElement = this.$_KFL_getFocusedElement()
      focusableList.forEach(item => {
        item.setAttribute('tabindex', item === focusedElement ? 0 : -1)
      })
    },
    $_KFL_getFocusableList() {
      let result = []
      if (this.$_KFL_settings.itemSelector) {
        const list = this.$el.querySelectorAll(this.$_KFL_settings.itemSelector)
        if (list.length === 0) {
          return result
        }
        const childDepth = depthOf(list[0], this.$el)
        result.push(list[0])
        for (let idx = 1; idx < list.length; idx++) {
          let item = list[idx]
          if (depthOf(item, this.$el) === childDepth) {
            result.push(item)
          }
        }
      }
      return result
    },
    $_KFL_supportKeyboard(e) {
      if (this.$_KFL_settings.backwardKeys.includes(getKey(e))) {
        this.$_KFL_findNextFocusable(-1).focus()
        e.preventDefault()
        e.stopPropagation()
      } else if (this.$_KFL_settings.forwardKeys.includes(getKey(e))) {
        this.$_KFL_findNextFocusable(1).focus()
        e.preventDefault()
        e.stopPropagation()
      } else if (this.$_KFL_settings.selectKeys.includes(getKey(e)) && this.$_KFL_settings.onSelect) {
        this.$_KFL_settings.onSelect(this.$_KFL_getFocusedElement())
        e.preventDefault()
        e.stopPropagation()
      } else if (this.$_KFL_settings.dismissKeys.includes(getKey(e)) && this.$_KFL_settings.onDismiss) {
        this.$_KFL_settings.onDismiss(this.$_KFL_getFocusedElement())
        e.preventDefault()
        e.stopPropagation()
      }
    },
    $_KFL_focus(el) {
      el.focus()
      this.$_KFL_updateTabIndex()
      if (this.$_KFL_settings.onFocus) {
        this.$_KFL_settings.onFocus(el)
      }
    },
    $_KFL_changeFocus(e) {
      const oldDepth = depthOf(e.target, this.document)
      const newDepth = depthOf(e.relatedTarget, this.document)
      if (oldDepth !== newDepth) {
        this.$_KFL_resetTabIndex()
      }
      e.stopPropagation()
    },
    $_KFL_resetTabIndex() {
      const focusableList = this.$_KFL_getFocusableList()
      const target = this.$_KFL_settings.getDefaultFocus ? this.$_KFL_settings.getDefaultFocus(focusableList) : focusableList[0]
      for (let index in focusableList) {
        focusableList[index].setAttribute('tabindex', focusableList[index] === target ? 0 : -1)
      }
    }
  },
  mounted() {
    const focusableList = this.$_KFL_getFocusableList()
    if (focusableList.length > 0) {
      focusableList.forEach((item, index) => {
        item.setAttribute('tabindex', index === 0 ? 0 : -1)
      })
      this.$_KFL_focusedElement = focusableList[0]
    }
    this.$el.addEventListener('keydown', this.$_KFL_supportKeyboard)
    this.$el.addEventListener('focusout', this.$_KFL_changeFocus)
  }
}
