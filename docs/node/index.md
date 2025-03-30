# node

```js
// xmodle.js
this.m = 5
exports.c = 3
// index.js
const moduleX = require('./xmodule')
console.log(modulex) // {m:5,c:3}
```

## Node.js 内置模块

**fs**
| 方法/属性 | 描述 |
|-----------|-----------------|
| `readFileSync` | 同步读取文件内容 |
| `writeFileSync` | 同步写入文件内容 |
| `appendFileSync` | 同步追加内容到文件末尾 |
| `readFile` | 异步读取文件内容 |
| `writeFile` | 异步写入文件内容 |
| `appendFile` | 异步追加内容到文件末尾 |
| `existsSync` | 检查文件是否存在 |
| `exists` | 异步检查文件是否存在 |
| `statSync` | 同步获取文件状态信息 |
| `stat` | 异步获取文件状态信息 |
| `mkdirSync` | 同步创建目录 |

- **os**
  | 方法/属性 | 描述 | 示例 |
  |-----------|------|------|
  | `os.EOL` | 操作系统特定的行末标识符 | Windows: "\r\n", POSIX: "\n" |
  | `os.arch()` | 返回 CPU 架构信息 | 'x64', 'arm', 'ia32' |
  | `os.cpus()` | 返回包含每个 CPU/核心信息的数组 | 包含型号、速度等详细信息 |
  | `os.freemem()` | 返回系统可用内存量(字节) | '' |
  | `os.homedir()` | 返回当前用户的主目录路径 | '' |
  | `os.hostname()` | 返回操作系统的主机名 | '' |
  | `os.tmpdir()` | 返回操作系统的默认临时文件目录 | '/tmp' |

- **path**
  | 方法/属性 | 描述 |
  |-----------|------|
  | `basename` | 返回路径中的最后一部分，通常是文件名 |
  | `sep` | 提供平台特定的路径片段分隔符, Windows 上是 \ |
  | `dirname` | 返回路径中的目录名 |
  | `extname` | 返回路径中的文件扩展名 |
  | `join` | 将多个路径片段连接成一个完整的路径 |
  | `resolve` | 将相对路径解析为绝对路径 |

- **url**

```js
const URL = require('url')

const url = new URL.URL('https://github.com/')
console.log(url)
```

- **utils**
  | 方法/属性 | 描述 |
  |-----------|------|
  | `callbackify` | 将 async/Promise 函数转换为遵循错误优先的回调风格的函数 |
  | `promisify` | 将回调风格的函数转换为返回 Promise 的函数 |
  | `types` | 提供类型检查函数，如 isDate()、isRegExp()等 |
  | `isDeepStrictEqual` | 深度比较两个值是否相等，包括对象属性的顺序和值 |

## 文件流

#### 可读流

```js
const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, 'package.json')

const rs = fs.createReadStream(filename, {
  encoding: '', // 编码格式
  highWaterMark: '', // 每次读取的字节数
  autoClose: true
})

rs.on('open', () => {})
rs.on('pause') // 暂停
rs.on('resume') // 继续
// ...
```

#### 可写流

#### pipe

```js
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
      rs.pause(); //暂停读取
    }
  })

  ws.on('drain', () => {
    console.log('drain')
    //继续写入
    rs.resume()
  })

  rs.on('close', () => {
    //写完了
    ws.end() //关闭写入流
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
    ws.end()
    console.timeEnd('copy3')
  })
}

copy3()
```

## Commonjs 中的模块化。
