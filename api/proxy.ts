const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = () => {
  return createProxyMiddleware({
    target: 'http://mdrs.yuanjin.tech', // 目标服务器地址
    changeOrigin: true,
    pathRewrite: {
      '^/api': '' // 重写路径，去掉 /api 前缀
    }
  })
}
