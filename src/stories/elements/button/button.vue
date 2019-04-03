<template>
  <div
    :style="isBlackBackground"
    :class="[nationalType, themesType]">
    <dp-button
      :href="hrefValue"
      :class="[buttonSize, buttonType]"
      :pill="isPill"
      :ripple="ripple"
      :is-block="isBlock"
      :is-disabled="isDisabled"
      :is-checked="isChecked">
      <span v-html="buttonContent"></span>
    </dp-button>
  </div>
</template>

<script>

const typeMode = {
  'Primary': 'dp-button--primary',
  'Ghost (Primary)': 'dp-button--ghost-primary',
  'Ghost (Primary light)': 'dp-button--ghost-primary-light',
  'Ghost (Secondary)': 'dp-button--ghost-secondary',
  'Home (Primary)': 'dp-button--home-primary',
  'Home (Secondary)': 'dp-button--home-secondary',
  'Tertiary': 'dp-button--tertiary',
  'Text': 'dp-button--text',
  'Radio': 'dp-button--radio',
  'Checkbox': 'dp-button--checkbox'
}

const sizeMode = {
  'Default': '',
  'Extra-Small': 'dp-button--xs',
  'Small': 'dp-button--sm'
}

const themesMode = {
  'Default': '',
  'Dark': 'dp-theme-dark',
  'Blue': 'dp-theme-blue'
}

const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th',
  'HK': 'dp-theme-hk',
  'VN': 'dp-theme-vn'
}

const iconLocation = {
  'none': '',
  'left': 'icon-left',
  'right': 'icon-right'
}

let buttonHtml = `<a class="dp-button">
                    <div>content</div>
                    <link class="rippleJS"> // This is a optional option
                  </a>`

export default {
  data () {
    return {
      hrefValue: text('href value', ''),
      buttonText: text('Text', 'Search'),
      buttonType: select('Type', typeMode, 'dp-button--primary'),
      buttonSize: select('Size', sizeMode, ''),
      isPill: boolean('Is Rounded (Pill)', false),
      nationalType: select('NationalType', nationalMode, ''),
      themesType: select('ThemesType', themesMode, ''),
      isBlock: boolean('Is block?', false),
      isDisabled: boolean('Is disabled?', false),
      isChecked: boolean('Is checked?', false),
      ripple: boolean('use ripple?', true),
      iconLocation: select('iconLocation', iconLocation, ''),
      iconShowOrHide: text('iconShowOrHide', 'dp-hidden__mobile'),
      buttonHtml: text('HTML Structure of Button(for read only)', buttonHtml)
    }
  },
  computed: {
    isBlackBackground() {
      if (this.buttonType === 'dp-button--ghost-primary-light') {
        return 'background-color:#000;padding:10px;margin:-10px;'
      }
    },
    buttonContent() {
      if (this.buttonType === 'dp-button--radio' || this.buttonType === 'dp-button--checkbox') {
        return '<i class="icon-check"></i>' + this.buttonText
      }
      if (this.iconLocation === 'icon-left') {
        return '<i class="dp-button__icon--left fa fa-search ' + this.iconShowOrHide + '"></i>' + this.buttonText
      }
      if (this.iconLocation === 'icon-right') {
        return this.buttonText + '<i class="dp-button__icon--right fa fa-search ' + this.iconShowOrHide + '"></i>'
      }
      return this.buttonText
    }
  },
  mounted() {
    if (this.themesType === 'dp-theme-dark') {
      document.querySelector('body').classList.add('dp-theme-dark')
    } else {
      document.querySelector('body').classList.remove('dp-theme-dark')
    }
    this.buttonHtml = text('HTML Structure of Button(for read only)', this.getButtonHTML())
  },
  methods: {
    getButtonHTML() {
      return document.querySelector('.dp-button').outerHTML
    }
  },
  watch: {
    themesType(val) {
      if (val === 'dp-theme-dark') {
        document.querySelector('body').classList.add('dp-theme-dark')
      } else {
        document.querySelector('body').classList.remove('dp-theme-dark')
      }
    }
  }
}
</script>
