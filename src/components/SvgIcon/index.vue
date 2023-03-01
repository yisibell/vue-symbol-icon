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
      <use :href="iconName" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'AiSvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
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
    }
  },
  computed: {
    styleVars () {
      return {
        '--svg-icon-color': this.color,
        '--svg-icon-font-size': this.fontSize
      }
    },
    isExternal () {
      return this.isOutLinks(this.iconClass)
    },
    iconName () {
      return `#icon-${this.iconClass}`
    },
    styleExternalIcon () {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
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
        const targetSymbol = document.querySelector(`${this.iconName}`)
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
svg#__SVG_SPRITE_NODE__ .use-current-color path {
  fill: currentColor !important;
  stroke: currentColor !important;
}
</style>
