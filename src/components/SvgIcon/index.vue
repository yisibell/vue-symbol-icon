<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    :class="['svg-external-icon', 'svg-icon', className]"
    v-on="$listeners"
  />
  <span
    v-else
    :style="styleVars"
    class="svg-icon-wrapper"
    v-on="$listeners"
  >
    <svg
      :class="['svg-icon', className]"
      :font-size="fontSize"
      aria-hidden="true"
    >
      <use :href="symbolId" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    // symbol name prefix
    symbolIdPrefix: {
      type: String,
      default: undefined
    },
    // symbol name
    name: {
      type: String,
      default: undefined
    },
    // alias of name
    iconClass: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    },
    fontSize: {
      type: String,
      default: undefined
    },
    className: {
      type: String,
      default: undefined
    }
  },
  computed: {
    globalOptions () {
      return this.$vueSymbolIcon || {}
    },
    styleVars () {
      return {
        '--svg-icon-color': this.color,
        '--svg-icon-font-size': this.fontSize
      }
    },
    symbolName () {
      return this.name || this.iconClass || ''
    },
    symbolId () {
      const prefix = this.symbolIdPrefix || this.globalOptions.symbolIdPrefix
      return `#${prefix}${this.symbolName}`
    },
    isExternal () {
      return this.isOutLinks(this.symbolName)
    },
    styleExternalIcon () {
      return {
        mask: `url(${this.symbolName}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.symbolName}) no-repeat 50% 50%`
      }
    }

  },
  watch: {
    color: {
      handler () {
        this.setSVGPathToCurrentColor()
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.setSVGPathToCurrentColor()
    },
    isOutLinks (path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    },
    setSVGPathToCurrentColor () {
      if (!this.color) return

      this.$nextTick(() => {
        if (!document) return

        const targetSymbol = document.querySelector(`${this.symbolId}`)
        targetSymbol && targetSymbol.classList.add('use-current-color')
      })
    }
  }
}
</script>

<style scoped>
.svg-icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--svg-icon-color);
  font-size: var(--svg-icon-font-size);
}

.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  stroke: currentColor;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

<style>
svg .use-current-color path {
  fill: currentColor !important;
  stroke: currentColor !important;
}
</style>
