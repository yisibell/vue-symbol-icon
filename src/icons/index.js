import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('SvgIcon', SvgIcon)

// require svg files
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext =>
  requireContext.keys().forEach(requireContext)
requireAll(req)
