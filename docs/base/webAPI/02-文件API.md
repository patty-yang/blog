# 📂 Web 文件操作 API

## 🔵 Blob（二进制大对象）

Blob（Binary Large Object）表示一个不可变的二进制数据对象。

### 创建 Blob

```javascript
// 从字符串创建
const blob = new Blob(['Hello, World!'], { type: 'text/plain' })

// 从 ArrayBuffer 创建
const buffer = new ArrayBuffer(8)
const blob2 = new Blob([buffer])
```

### 🛠 常用方法

| 方法名         | 描述                    | 示例              |
| -------------- | ----------------------- | ----------------- |
| ✨ size        | Blob 对象的大小（字节） | `blob.size`       |
| 🧹 type        | MIME 类型               | `blob.type`       |
| ⬅️ slice       | 截取 Blob 的一部分      | `blob.slice(0,1)` |
| ➡️ arrayBuffer | 读取为 ArrayBuffer      |                   |

## 📄 File

File 接口继承自 Blob，表示用户选择的文件。

### 获取 File 对象

```javascript
// 通过 input 元素
;<input
  type='file'
  onChange={(e) => {
    const file = e.target.files[0]
    console.log(file.name, file.size, file.type)
  }}
/>

// 通过拖拽
element.addEventListener('drop', (e) => {
  const file = e.dataTransfer.files[0]
})
```

### 🛠 文件属性

| 方法名          | 描述           |
| --------------- | -------------- |
| ✨ name         | 文件名         |
| ✨ size         | 文件大小       |
| ✨ type         | 文件 MIME 类型 |
| ✨ lastModified | 最后修改时间   |

## 📖 FileReader

用于异步读取文件内容。

### 🛠 读取方法

const reader = new FileReader()

| 方法名               | 描述               | 示例                       |
| -------------------- | ------------------ | -------------------------- |
| ✨ readAsText        | 读取为文本         | `reader.readAsText(file)`  |
| ✨ readAsDataURL     | 读取为 DataURL     | `reader.DataURL(file)`     |
| ✨ readAsArrayBuffer | 读取为 ArrayBuffer | `reader.ArrayBuffer(file)` |

### 事件处理

```javascript
const reader = new FileReader()

reader.onload = (e) => {
  // 读取完成
  console.log(e.target.result)
}

reader.onerror = (e) => {
  // 读取错误
  console.error('Error:', e)
}

reader.onprogress = (e) => {
  // 读取进度
  if (e.lengthComputable) {
    const progress = (e.loaded / e.total) * 100
    console.log(`Progress: ${progress}%`)
  }
}
```

## 🌰 实践示例

### 图片预览

```javascript
function previewImage(file) {
  const reader = new FileReader()

  reader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result
    document.body.appendChild(img)
  }

  reader.readAsDataURL(file)
}
```

### 文件分片上传

```javascript
function uploadChunks(file, chunkSize = 1024 * 1024) {
  const chunks = Math.ceil(file.size / chunkSize)

  for (let i = 0; i < chunks; i++) {
    const chunk = file.slice(
      i * chunkSize,
      Math.min((i + 1) * chunkSize, file.size)
    )

    // 上传分片
    uploadChunk(chunk, i)
  }
}
```
