import SvgIcon from './SvgIcon/index'

const install = (Vue, options) => {
  const finalOptions = Object.assign({
    globalComponentName: SvgIcon.name || 'SvgIcon',
    symbolIdPrefix: 'icon-'
  }, options)

  Vue.prototype.$vueSymbolIcon = finalOptions

  Vue.component(finalOptions.globalComponentName, SvgIcon)
}

export {
  SvgIcon
}

export default {
  install
}
