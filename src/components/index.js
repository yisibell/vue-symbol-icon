import SvgIcon from './SvgIcon/index'

const install = (app, options) => {
  const finalOptions = Object.assign({
    globalComponentName: SvgIcon.name || 'SvgIcon',
    symbolIdPrefix: 'icon-'
  }, options)

  app.config.globalProperties.$vueSymbolIcon = finalOptions

  app.component(finalOptions.globalComponentName, SvgIcon)
}

export {
  SvgIcon
}

export default {
  install
}
