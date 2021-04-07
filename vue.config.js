const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
  },
  publicPath: './',
  devServer: {
    open: true, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://autumnfish.cn/search',
        // ws:true,npm
        changeOrigin: true, // 是否允许跨越
        pathRewrite: {
          '^/api': ''
        }
      }

    }
  }
}
