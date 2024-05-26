const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/test': {
  //       target: 'https://baidu.com',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/test': '' // 遇到接口路径有test的，就换成http://www.baidu.com/这个请求头，同时把test去掉
  //       }
  //     }
  //   }
  // }
  publicPath: './'
}
)
