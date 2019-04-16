<template>
  <component
    :is="isALinktag ? 'a' : 'button'"
    class="dp-button"
    :type="!isALinktag ? 'button' : null"
    :href="href"
    :class="{
      'dp-button--block': isBlock,
      'disabled': isDisabled,
      'checked': isChecked,
      'dp-border-pill': pill
    }"
    :disabled="!isALinktag && isDisabled"
    :aria-disabled="isDisabled"
    :checked="isChecked"
    @click="onClick($event)">
    <slot></slot>
    <link
      class="rippleJS"
      v-if="ripple && !isDisabled">
  </component>
</template>
<style lang="scss">
@import '~assets/css/elements/button';
</style>
<script>
import Vue from 'vue'

const isServer = Vue.prototype.$isServer

if (!isServer) {
  require('vanilla-ripplejs')
}

export default {
  name: 'dp-button',
  props: {
    isBlock: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    isChecked: { type: Boolean, default: false },
    ripple: { type: Boolean, default: true },
    href: { type: String, default: null },
    pill: { type: Boolean, default: false }
  },
  computed: {
    isALinktag() {
      return this.href && this.href.trim()
    }
  },
  methods: {
    onClick(event) {
      if (event) {
        if (!this.isDisabled) {
          this.$emit('click', event)
        } else {
          event.preventDefault()
        }
      }
    }
  }
}
</script>
