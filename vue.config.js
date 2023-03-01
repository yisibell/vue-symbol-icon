const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    extract: false
  },
  productionSourceMap: false,
  chainWebpack(config) {
    // 变更 url-loader 不处理指定文件夹下作为icon使用的svg文件
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    // 添加 svg-sprite-loader 处理指定文件夹下的svg文件
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
};
