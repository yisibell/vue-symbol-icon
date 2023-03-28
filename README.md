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

``` vue
<template>
  <svg-icon icon-class="svg-symbol-name" font-size="36px" color="red" />

  <!-- In v1.2.0 and above -->
  <svg-icon name="svg-symbol-name" font-size="36px" color="red" />
</template>
```

In `v2.x`, you can use `vue-symbol-icon` as a global component via vue plugin:

```js
import Vue from 'vue'
import SvgIcon from 'vue-symbol-icon'

Vue.use(SvgIcon)
```

Or, Local registration:

```js
import { SvgIcon } from 'vue-symbol-icon'

export default {
  components: {
    SvgIcon
  }
}
```

# Properties

| Prop name | Default value | Description | Type | Support version |
| :---: | :---: | :---: | :---: | :---: |
| `name` | `undefined` |   SVG **symbol name** which is SVG filename in the SVG folder.  | `string` | `v1.2.0` |
| `symbolPrefix` | `icon-` |   SVG **symbol id prefix**.  | `string` | `v1.2.0` |
| `icon-class` | `undefined` |   alias of `name` | `string` | `v1.1.0` |
| `className` | `undefined` |  Add Extra class name to SVG Element | `string` | `v1.1.0` |
| `color` | `undefined` | Define SVG color | `string` | `v1.1.0` |
| `fontSize` | `undefined` | Define SVG size  | `string` | `v1.1.0` |


:warning: TIPS,  `name` and `symbolPrefix` form the **Symbol id**.

```vue
<template>
  <svg-icon symbol-prefix="icon-" name="symbol-name" />
</template>
```

It's look like:

```html
<svg><use href="#icon-symbol-name" /></svg>
```

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

// In vue-symbol-icon 1.x
// Vue.component('SvgIcon', SvgIcon) 

// In vue-symbol-icon 2.x
Vue.use(SvgIcon)

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

// In vue-symbol-icon 1.x
// Vue.component('SvgIcon', SvgIcon) 

// In vue-symbol-icon 2.x
Vue.use(SvgIcon)

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
