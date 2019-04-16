import _ from 'lodash'

export default {
  props: {
    label: {
      type: String
    },
    minLength: {
      type: Number,
      default: 0
    },
    maxLength: {
      type: Number,
      default: 0
    },
    required: {
      type: Boolean,
      default: false
    },
    errorStatus: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String
    },
    value: {
      type: String
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false,
      inputing: false,
      showCharacterCounter: false,
      showError: false,
      beginCatchError: false
    }
  },
  created() {
    this.beginCatchError = true
  },
  computed: {
    isValidValue() {
      return (
        !_.isUndefined(this.value) &&
        !_.isNull(this.value) &&
        this.value !== ''
      )
    },
    isActive() {
      return this.active || this.isValidValue
    },
    characterCounterInfo() {
      return `${this.valueLength}/${this.maxLength}`
    },
    isShowCharacterCounter() {
      return !!this.maxLength && this.showCharacterCounter
    },
    isError() {
      return (this.showError && !!this.error) || this.errorStatus
    },
    error() {
      return this.basicError
    },
    basicError() {
      if (!this.beginCatchError) {
        return null
      }
      if (this.required && !this.isValidValue) {
        return {
          type: 'empty',
          message: 'This field is required.'
        }
      }
      if (!!this.maxLength && this.valueLength > this.maxLength) {
        return {
          type: 'overLength',
          message: `The text length is more then ${this.maxLength}`
        }
      }
      if (!!this.minLength && this.valueLength < this.minLength) {
        return {
          type: 'lessLength',
          message: `The text length is less then ${this.minLength}`
        }
      }
      return null
    },
    valueLength() {
      if (!this.isValidValue) {
        return 0
      }
      return this.value.length
    }
  },
  methods: {
    focus(e) {
      this.active = true
      this.inputing = true
      this.showCharacterCounter = true
      this.showError = false
      this.selectAll(e)
      this.$emit('focus', e)
    },
    blur(e) {
      this.active = false
      this.inputing = false
      this.showCharacterCounter = false
      this.showError = true
      this.upadteMessage()
      this.$emit('blur', e)
    },
    input(e) {
      this.upadteMessage()
      this.$emit('input', e.target.value)
    },
    selectAll(event) {
      let target = event.target
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      setTimeout(() => {
        target.select()
      })
    },
    upadteMessage() {
      let msg = this.error ? this.error.message : ''
      this.$emit('update:errorMessage', msg)
    }
  },
  watch: {
    error(val) {
      this.upadteMessage()
    }
  }
}
