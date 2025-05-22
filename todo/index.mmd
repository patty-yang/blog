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
      rs.pause() //暂停读取
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

## mysql

CREATE DATABASE name
DROP DATABASE

字段类型
bit 占 1 位，0 或 1，false 或 true
init 占 32 位 整数
decimal(M,N) 能精确计算的实数，M 是总的字位数， N 是小数位数
char(n) 固定长度 n 位的字符
varchar(n) 长度可变，最大长度位 n 的字符
text: 大量的字符
date: 仅日期
datetime: 日期和时间
time: 仅时间

根据设计原则，每个表都应该有主键，表示唯一值

- 主键：
  - 唯一
  - 不能更改
  - 无业务含义
- 主键和外键
- 表关系
  - 一对一关系
    - 一个 A 对应一个 B，一个 B 对应一个 A
      - 用户信息
  - 一对多
    - 一个 A 对应多个 B，一个 B 对应一个 A，A 和 B 是一对多，B 和 A 是多对一
      - 班级和学生(一个班可以有多个学生，一个学生只属于一个班)，用户和文章(
        一个用户可以发布多个文章，一个文章只属于一个用户)
      - 在多的一端的表上设置外键，对应到另一张表的主键
  - 多对多
    - 一个 A 对应多个 B，一个 B 对应多个 A
      - 购物车
        - 需要新建一张关系表，关系表至少包含两个外键，分别对应到两张表

```sql-- 增加语句
-- INSERT INTO d_stu (number_id, `name`, birthday, sex, phone, d_class_id)
-- VALUES
-- ('200', '你好', '2005-1-1', TRUE, '13303333300', 1)
-- 多个
-- INSERT INTO d_stu (number_id, `name`, birthday, sex, phone, d_class_id)
-- VALUES
-- ('200', '你好', '2005-1-1', DEFAULT, '13303333300', 1),
-- ('201', '你好', '2005-1-1', DEFAULT, '13303333300', 1),
-- ('202', '你好', '2005-1-1', DEFAULT, '13303333300', 1);
-- 修改
-- UPDATE d_stu SET `name` = '中文' WHERE id=8;
-- 删除
-- DELETE FROM d_stu WHERE `name` = '你好';
-- 查询 -> 单表
-- SELECT * from `user` WHERE ID = 2
SELECT id,`name`,
	CASE WHEN ismale = 1 THEN '男' ELSE '女' END AS '性别',
	CASE WHEN salary >= 10000 THEN '高' ELSE '女' END AS '工资'
FROM employee
SELECT * from department WHERE companyId IN (1,2)
SELECT * from employee WHERE location is not NULL;
SELECT * from employee WHERE `name` like '%云%'
SELECT * from employee WHERE `name` like '_云'
SELECT * FROM `user` WHERE loginId = 'admin' AND loginPwd = '123123'
SELECT * FROM employee ORDER BY employee.joinDate DESC LIMIT 10,10
查询 -> 连表
SELECT * from `user`, company
SELECT * from department as d LEFT JOIN employee as e
ON d.id = e.deptid
```
