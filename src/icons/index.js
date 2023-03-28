import Vue from 'vue'
import SvgIcon from '@/components' // install via vue plugin
// import { SvgIcon } from '@/components' // svg component

// register globally
// Vue.component('SvgIcon', SvgIcon)
Vue.use(SvgIcon)

// require svg files
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext =>
  requireContext.keys().forEach(requireContext)
requireAll(req)
