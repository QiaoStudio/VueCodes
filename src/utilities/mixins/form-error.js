export default {
  props: {
    errorStyle: {type: String, default: ''}
  },
  data() {
    return {
      width: 0,
      display: '<div></div>',
      placement: 'top',
      appendToBody: true
    }
  },
  computed: {
    isPopoverError() {
      return this.errorStyle === 'popover'
    }
  }
}
