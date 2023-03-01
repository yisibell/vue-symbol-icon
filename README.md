<p align="center">
  <a href="https://www.npmjs.org/package/vue-symbol-icon">
    <img src="https://img.shields.io/npm/v/vue-symbol-icon.svg">
  </a>
  <a href="https://npmcharts.com/compare/vue-symbol-icon?minimal=true">
    <img src="https://img.shields.io/npm/dm/vue-symbol-icon.svg">
  </a>
  <br>
</p>


# vue-symbol-icon

A Vue **SVG Symbol icon** component for **svg-sprite-loader**, Easy to custom SVG icon 's `color` and `size`!!!

> TIPS:  `vue-symbol-icon` needs to be used in conjunction with `svg-sprite-loader` . So, please pre-install <a href="https://github.com/JetBrains/svg-sprite-loader" target="_blank"> svg-sprite-loader </a> and config it.

# Features

- Ability to manipulate SVG icons. e.g. using `font-size` and `color`.
- Support <a href="https://www.iconfont.cn/" target="_blank">Iconfont svg icons</a>.

# Installation

``` bash
# pnpm
$ pnpm add vue-symbol-icon

# yarn
$ yarn add vue-symbol-icon

# npm
$ npm i vue-symbol-icon
```

# Usage

**demo.vue**

``` vue
<template>
  <svg-icon icon-class="svg-symbol-id" font-size="36px" color="red" />
</template>
```

# Properties

| Prop name | Default value | Required  | Description | Type |
| :---: | :---: | :---:| :---: | :---: |
| `icon-class` | `undefined` | `true` |  SVG Symbol Id which is SVG filename in the SVG folder.  | `string` |
| `className` | `undefined` | `false` | Add Extra class name to SVG Element | `string` |
| `color` | `undefined` | `false` | Define SVG color | `string` |
| `fontSize` | `undefined` | `false` | Define SVG size  | `string` |

# How to config **svg-sprite-loader** ?

## In `Vue CLI`

1. First, you need config `webpack` with `chainWebpack`:

``` js
// vue.config.js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // ...
  chainWebpack(config) {
    
    // Change the configuration of url-loader so that it does not process svg files used as icons in the specified folder
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    // Add svg-sprite-loader to process svg files in the specified folder
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
}
```

2. Then, place your `.svg` icon files in the `src/icons/svg` folder.

3. Defines the **entry point** for batch importing `.svg` modules:

``` js
// src/icons/index.js

import Vue from 'vue'
import SvgIcon from 'vue-symbol-icon' // svg component

// 1. register globally
Vue.component('svg-icon', SvgIcon) 

// 2. require svg files
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().forEach(requireContext)
requireAll(req)
```

4. Finally, these `.svg` files are centrally imported in the project entry file `main.js`.

``` js
import Vue from 'vue'

import '@/icons'

new Vue({
  // ...
})
```

## In Nuxt2

1. First, config `webpack` in the `nuxt.config.js`:

``` js
// nuxt.config.js

export default {
  // ...
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient }) {
      if (isClient) {
        const svgRule = config.module.rules.find((rule) =>
          rule.test.test('.svg')
        )
        svgRule.exclude = [resolve('assets/icons/svg')]

        // Includes /assets/icons/svg for svg-sprite-loader
        config.module.rules.push({
          test: /\.svg$/,
          include: [resolve('assets/icons/svg')],
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          },
        })
      }
    },
  }
  // ...
}
```

2. Centralize your `*.svg` icon files in the `~/assets/icons/svg` folder.

3. Create a new `~/plugins/svg-icon.js` file and write in it:

``` js
import Vue from 'vue'
import SvgIcon from 'vue-symbol-icon' // svg component

// 1. register globally
Vue.component('svg-icon', SvgIcon) 

// 2. require svg files
const req = require.context('~/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().forEach(requireContext)
requireAll(req)
```

4. Configure the **svg-icon** plugin to `nuxt.config.js`:

``` js
export default {
  // ...

  plugins: [
    // ...
    { src: '~/plugins/svg-icon', mode: 'client' }
  ]

  // ...
}
```

# CHANGE LOG

<a href="./CHANGELOG.md" target="_blank">CHANGE LOG</a>.
