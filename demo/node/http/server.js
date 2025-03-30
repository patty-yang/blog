const http = require('http')
// const url = require('url')

const server = http.createServer((req, res) => {
  //   console.log('收到请求了')
  //   console.log('请求方法', req.method)
  //   console.log('请求路径', req.url)
  //   console.log('请求头', req.headers)
  // const result = url.parse(req.url, true)
  //   console.log('🚀 ~ server ~ result:', result)

  req.on('data', (chunk) => {
    console.log('收到消息体了', chunk.toString()) // 消息体
  })

  res.setHeader('Content-Type', 'application/json')
  // res.setHeader('a', '1')
  // res.statusCode = 302
  res.end(
      JSON.stringify({
        code: 200,
        data: {
          name: 'hello',
          age: 18
        }
      })
  )
})

server.listen(8080, () => {
  console.log('服务器启动成功了')
})
