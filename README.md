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

# Plugin options

| Key | Type | Default value | Description |
| :---: | :---: | :---: | :---: |
| `globalComponentName` <br /> (Added in `v2.1.0`) | `string` | `SvgIcon` | Define the global component name. |
| `symbolIdPrefix` <br /> (Added in `v2.1.0`) | `string` | `icon-` | Set SVG **symbol id prefix** in global. |

# Component properties

| Prop name | Default value | Description | Type | Added in |
| :---: | :---: | :---: | :---: | :---: |
| `name` | `undefined` |   SVG **symbol name** which is SVG filename in the SVG folder.  | `string` | `v1.2.0` |
| `symbolIdPrefix` | `undefined` |   SVG **symbol id prefix**.  | `string` | `v1.2.0` |
| `iconClass` | `undefined` |   alias of `name` | `string` | `v1.1.0` |
| `className` | `undefined` |  Add Extra class name to SVG Element | `string` | `v1.1.0` |
| `color` | `undefined` | Define SVG color | `string` | `v1.1.0` |
| `fontSize` | `undefined` | Define SVG size  | `string/number` | `v1.1.0` |
| `size` | `undefined` | Alias of `fontSize`  | `string/number` | `v2.2.0` |
| `width` | `undefined` | Alias of `fontSize`  | `string/number` | `v2.2.0` |


:warning: TIPS,  `name` and `symbolIdPrefix` form the **Symbol id**. Global plugin configuration has lower priority than component properties.

```vue
<template>
  <svg-icon symbol-id-prefix="icon-" name="symbol-name" />
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

Please use [nuxt-symbol-icons](https://github.com/yisibell/nuxt-symbol-icons) module. more details see it's docs.

# CHANGE LOG

<a href="./CHANGELOG.md" target="_blank">CHANGE LOG</a>.
