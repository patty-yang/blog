// setTimeout
// setInterval
// setImmediate
// console
// console.log(__dirname)
// console.log(__filename)
// Buffer
// const bf = Buffer.from('act', 'utf-8')
// console.log(bf)
// process
// console.log(process.cwd(), 'process.cwd()') // 运行 node 时，所在命令行处在的路径
// console.log(process.argv, 'process.argv') // 命令行参数

// console.log(process.platform, 'process.platform')
// console.log(process.env, 'process.env') // 环境信息

// this.m = 5
// exports.c = 3
// module.exports = {
//   a: 1,
//   b: 2
// }

// const os = require('os') // \r \n \r\n
// // console.log(os.EOL)
// //
// // console.log(os.arch()) // cpu
// //
// console.log(os.cpus().length) // cup 核
//
// // console.log(os.freemem() / 1024 ** 2 ) // 还有多少内存可用
// //
// // console.log(os.homedir())
// //
// // console.log(os.hostname())
//
// console.log(os.tmpdir())  // 获取操作系统的临时目录

//
// const path = require('path')
//
// const basename = path.basename('asd/asd/asd/asd/a.html', '.html')
// console.log(basename, 'basename')
//
//
// console.log(path.sep, 'path.sep')

// const URL = require('url')
//
// const url = new URL.URL('https://github.com/')
// console.log(url)

// const util = require('util')

// async function delay(time = 1000) {
//   return new Promise(res => {
//     setTimeout(() => {
//       res(time)
//     }, time)
//   })
// }
//
//
// const delayCb = util.callbackify(delay)
//
// delayCb(500, (err, d) => {
//   console.log(d)
// })

// function delayCallback(d, cb) {
//   setTimeout(() => {
//     cb(null, d)
//   }, d)
// }
//
// const delay = util.promisify(delayCallback)
//
// delay(500).then(d => console.log(d))

// console.log(util.types)

// 文件流 -> 可读流
const fs = require('fs')
const path = require('path')

// const fileName = path.resolve(__dirname, 'package.json')
// const rs = fs.createReadStream(fileName, {
//   encoding: null,
//   // highWaterMark: 1,
//   autoClose: true
// })
//
// rs.on('open', () => {
//   // console.log('yes')
// })
//
//
// rs.pause()
// rs.resume()
//
// rs.on('data', chunk => {
// })

// 文件流 -> 可写流
async function copy1() {
  const from = path.resolve(__dirname, 'package.json')
  const to = path.resolve(__dirname, 'pack-copy.json')

  console.time('copy1')

  const content = await fs.promises.readFile(from)

  await fs.promises.writeFile(to, content)

  console.timeEnd('copy1')
  console.log('复制完成')
}

copy1()

async function copy2() {
  const from = path.resolve(__dirname, 'package.json')
  const to = path.resolve(__dirname, 'pack-copy.json')

  console.time('copy2')

  const rs = fs.createReadStream(from)
  const ws = fs.createWriteStream(to)

  rs.on('data', (chunk) => {
    const flag = ws.write(chunk)
    if (!flag) {
      //表示下一次写入，会造成背压
      rs.pause(); //暂停读取
    }
  })

  ws.on('drain', () => {
    console.log('drain')
    //可以继续写了
    rs.resume()
  })

  rs.on('close', () => {
    //写完了
    ws.end() //完毕写入流
    console.timeEnd('copy2')
    console.log('复制完成')
  })
}

copy2()

async function copy3() {
  const from = path.resolve(__dirname, 'package.json')
  const to = path.resolve(__dirname, 'pack-copy.json')

  console.time('copy3')

  const rs = fs.createReadStream(from)
  const ws = fs.createWriteStream(to)

  rs.pipe(ws)

  rs.on('close', () => {
    console.timeEnd('copy3')
  })
}

copy3()
