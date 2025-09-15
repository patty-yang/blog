---
title: 数组新 API
date: 2020-09-15
tags:
  - js
---

## Array.of() 🌟

- ✨ `of` 不论参数的数量和类型，都会将其作为数组的元素
- 🎯 解决了 `new Array(3)` 作为数组的长度，可能会造成的混淆

示例：

```js
const arr = Array.of(3) // [3]
const arr2 = new Array(3) // [empty × 3]
```

## Array.form() 🌟

- ✨ `form` 可以将类数组对象转化为数组

## Array.fill() 🌟

- ✨ `fill` 将数组的每一项填充为指定的值

## Array.copyWithin() 🌟

- ✨ `copyWithin` 将数组的某一项复制到指定位置

```js
let arr = [1, 2, 3, 4, 5]

arr.copyWithin(0, 3) // 从索引 3 开始复制到索引 0
console.log(arr) // [4, 5, 3, 4, 5]

arr.copyWithin(1, 2, 4) // 从索引 2 复制到索引 1，直到索引 4
console.log(arr) // [4, 3, 4, 5, 5]
```

## 🔧 ArrayBuffer

ArrayBuffer 是一个强大的对象，专门用于存储固定大小的二进制数据缓冲区。提供了直接操作内存的能力！

### 📝 基础用法

```js
// 创建一个用于存储10字节的内存空间
const buffer = new ArrayBuffer(10)

// 可以通过 `byteLength` 获取到字节数
buffer.byteLength // 10

// 可以通过 slice 得到新的 ArrayBuffer
const buffer2 = buffer.slice(2, 4) // 从下标为3 截取到 5
```

### 📖 读取 ArrayBuffer

要读取 ArrayBuffer 中的数据，我们需要通过特定的视图对象来实现。主要有以下几种视图：

- 🔍 **DataView**: 最灵活的读取方式，可以控制字节序
- 📊 **TypedArray**: 提供了不同数据类型的专门视图

示例代码：

```js
// 创建一个用于存储10字节的内存空间
const buffer = new ArrayBuffer(10)

// 可以通过 `byteLength` 获取到字节数
buffer.byteLength // 10

// 可以通过 slice 得到新的 ArrayBuffer
const buffer2 = buffer.slice(2, 4) // 从下标为3 截取到 5
```

#### 读取 ArrayBuffer

```js
// 1.
const buffer = new ArrayBuffer(10)

const view = new DataView(buffer)

// DataView(buffer,byteOffset(偏移量), byteLength(操作的长度))

view.setInt8(4, 3)

console.log(view.getInt8())
// 2.

// - 每一个类型话数组都对应一个 buffer 来保存对应的数据
// - 如果没有手动指定 ArrayBuffer 类型化数组创建时，会新建一个 ArrayBuffer
const bf = new ArrayBuffer(10)

const arr1 = new Int8Array(bf)
const arr2 = new Int16Array(buffer)

// console.log(arr1 === arr2) // false
// console.log(arr1.buffer === arr2.buffer) // true 操作的内存空间是一样的

arr[1] = 10
console.log(arr1)
console.log(arr2)
```

## 将一张图片通过 canvas 转化为黑白

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>

<div>
  <img style="width: 500px;height: 300px" alt="" id="img">
  <br>
  <canvas id="canvas" width="500" height="500"></canvas>
  <script>
    /**
     * 将图片转为黑白
     *
     * 画布中的 1个图像是由多个像素点组成，每个像素点拥有四个数据： rgba（红、绿、蓝、透明度）
     *  所以需要将图像的每个像素点设置为 rgb 的平均数值
     */
    window.addEventListener('load', () => {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      const img = document.getElementById('img')

      ctx.drawImage(img, 0, 0, img.width, img.height)
      // 获取画布上从左上角到图片的宽高大小的区域的像素数据
      const imgData = ctx.getImageData(0, 0, img.width, img.height)

      for (let i = 0; i < imgData.data.length; i += 4) {
        const red = imgData.data[i]
        const green = imgData.data[i + 1]
        const blue = imgData.data[i + 2]
        const gray = (red + green + blue) / 3

        imgData.data[i] = gray
        imgData.data[i + 1] = gray
        imgData.data[i + 2] = gray
      }

      ctx.putImageData(imgData, 0, 0)
    })

  </script>
</div>
</body>
</html>
```