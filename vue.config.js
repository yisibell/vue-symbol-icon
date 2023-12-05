const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

const isBuildExample = () => {
  const { BUILD_TYPE } = process.env
  return BUILD_TYPE === 'example'
}

module.exports = {
  publicPath: '/vue-symbol-icon/',
  outputDir: isBuildExample ? 'example-dist' : 'dist',
  css: {
    extract: false
  },
  productionSourceMap: false,
  chainWebpack (config) {
    // 变更 url-loader 不处理指定文件夹下作为icon使用的svg文件
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 添加 svg-sprite-loader 处理指定文件夹下的svg文件
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
