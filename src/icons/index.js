import SvgIcon from '@/components' // install via vue plugin

// require svg files
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext =>
  requireContext.keys().forEach(requireContext)
requireAll(req)

export const installIcons = (app) => {
  app.use(SvgIcon)
}
