---
title: vue 虚拟 dom
date: 2024-05-01
tags:
  - vue
---

## 💡 什么是虚拟 DOM？

通过 JavaScript 对象来描述真实 DOM 树的结构。这个对象包含了节点的各种关键信息：

### 📝 核心组成部分

- `props` ⚡️：保存节点的各种属性信息
- `tag` 🏷：标记节点的类型标签
- `children` 🌲：记录所有子节点信息

> 💫 简而言之，虚拟 DOM 就是这样一个 JavaScript 对象，它映射和模拟了真实的 DOM 结构。

## 🤔 那真实 DOM 是指什么

```js
const div = document.createElement('div')
```

🌐 **WebIDL** (`Web Interface Definition Language`)

> 📝 WebIDL 翻译成中文就是 web 接口定义语言，定义了:

- js 与浏览器之间的通信 🌉
- DOM 接口的描述

🔧 通过 WebIDL，**浏览器开发者** 可以:

- 🎯 描述 JavaScript 可调用的类和方法
- 🔄 描述映射到 JavaScript 中的对象和方法

```c++
// 1. webIDL 定义,创建 DOM 元素
interface Document {
  Element createElement(DOMString tagName);
}

// 2. 浏览器开发者接口实现
class Document {
  Element* createElement(const std::string& tagName) {
    return new Element(tagName);
  }
}

// 3. 生成绑定代码
void Document_createElement(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::HandleScope scope(isolate);
  Document* document = args.Holder()->GetInternalField(0);
  // 由 webIDL 编译器生成,从js到c++的绑定代码

  // 获取 tagName
  std::string tagName = args[0]->ToString();
  // 创建 Element 对象
  Element* element = document->createElement(tagName);
  // 将 Element 对象返回给 js
  args.GetReturnValue().Set(element);
}

// 4. 在 js 引擎中注册
// AI 生成
void RegisterDocument(v8::Isolate* isolate) {
  v8::Local<v8::FunctionTemplate> documentTemplate = v8::FunctionTemplate::New(isolate, Document_createElement);
  v8::Local<v8::ObjectTemplate> documentObjectTemplate = documentTemplate->InstanceTemplate();
  documentObjectTemplate->SetInternalFieldCount(1);
  v8::Local<v8::Object> documentObject = documentObjectTemplate->NewInstance(isolate->GetCurrentContext()).ToLocalChecked();
}
```

```js
const div = document.createElement('div')
```

**_真实 DOM 的创建_**

🔹 所以真实 DOM 的产生就是一个 C++ 方法的调用，而不是普通的 js 函数

> 重新渲染绘制 呢 TODO

### ⚙️ 执行流程

1. JavaScript 引擎处理

    - 将代码识别为特殊的 API 调用
    - 向浏览器内核发送创建元素的请求

2. 浏览器处理

    - 接收请求并通过 C++ 实现创建 DOM 元素
    - 创建完成后返回对应的 JavaScript 对象

   ```txt
    A[JavaScript 代码] -> B[C++ 方法调用]
    B -> C[创建 DOM 元素]
    C -> D[返回 JS 对象]
   ```

## Vue 中的虚拟 DOM

```vue

<script setup>
  import {h} from 'vue'
  import Child from './child.vue'

  const vNode = h(Child)
  console.log('🚀 ~ vNode:', vNode)
</script>
```

![Vue Vnode](https://raw.githubusercontent.com/patty-yang/pic/img/test/20250316234053.png)

## 🤔 为什么需要虚拟 DOM

在 Web 开发的早期阶段，开发者主要通过直接操作 DOM 的方式来更新页面内容。这种方式被称为 **命令式编程** ，从性能角度来看确实是最优的选择。

```js
// 增
const div = document.createElement('div')
document.body.appendChild(div)
// 删
document.body.removeChild(div)
// 改
div.innerHTML = 'hello'
// 查
const div = document.querySelector('div')
```

#### 两种方式的对比

```js
// 1. 命令式编程
const app = document.getElementById('app')
const messageDiv = document.createElement('div')
messageDiv.className = 'message'
const infoDiv = document.createElement('div')
infoDiv.className = 'info'
app.appendChild(messageDiv)
app.appendChild(infoDiv)

// 2. 声明式编程
app.innerHTML = '
    < div

class

= "message" > hello < /div>
<div class="info">world</div>
'
```

🚀 **命令式编程**

- ✅ 性能最优
- ❌ 开发复杂度高
- ❌ 容易产生 bug
- ❌ 维护成本高

🌟 **声明式编程**

- ✅ 开发效率高
- ✅ 代码可维护性强
- ✅ 降低开发者心智负担
- ⚠️ 性能略有损耗

> 💡 虽然命令式编程在性能上占优，但现代开发者更倾向于采用声明式编程。因为开发效率和可维护性的提升，往往能够弥补些许的性能损耗。

#### 🤔 性能损耗在什么地方

- 计算过程

  > 🎯 **声明式编程** 需要经过两个计算层面:
  >
  > > - **JavaScript 层面**: 解析模板字符串
  > > - **DOM 层面**: 构建实际的 DOM 节点结构

  > 💫 **虚拟 DOM** 同样涉及双层计算:

  > - 📊 **JavaScript 层面**: 构建虚拟 DOM 对象
  > - 🎨 **DOM 层面**: 基于虚拟 DOM 创建真实 DOM

🔍 **性能对比测试**:

```js
console.time('time')
const arr = []
for (let i = 0; i < 10000000; i++) {
  const div = {a: 1}
  arr.push(div)
}
console.timeEnd('time')

// ----------------------------
console.time('time')
const arr = []
for (let i = 0; i < 10000000; i++) {
  const div = document.createElement('div')
  arr.push(div)
}
console.timeEnd('time')
```

| 操作类型            | 耗时           | 说明             |
|-----------------|--------------|----------------|
| JavaScript 对象创建 | ⚡️ 170-200ms | 创建一千万个普通 JS 对象 |
| DOM 节点创建        | 🐢 2000+ms   | 创建一千万个 DOM 节点  |

`document.createElement('div')` 会被识别为 API 调用，等待渲染器引擎反馈结果，所以性能差距很大

## 🎯 虚拟 DOM 的性能优势

```html

<body>
<div class="container"></div>
<button id="update">update</button>

<script>
  const container = document.querySelector('.container')

  update.addEventListener('click', () => {
    container.innerHTML = new Date().toLocaleString()
  })
</script>
</body>
```

### 🔄 直接操作 DOM 的计算层面

在这个简单的示例中，直接操作 DOM 需要经过以下几个计算步骤：

1. **DOM 层面**: 销毁旧的 DOM 节点
2. **JS 层面**: 解析新的字符串内容
3. **DOM 层面**: 创建新的 DOM 节点

### ⚡️ 虚拟 DOM 的计算层面

相比之下，使用虚拟 DOM 只有两个层面的计算：

1. **JS 层面**: 通过 diff 算法计算需要更新的 DOM 节点
2. **DOM 层面**: 使用 patch 算法更新必要的 DOM 节点

所以虚拟 DOM 的真正优势在于**更新阶段**的性能表现：

- **初始渲染**：与直接操作 DOM 相比差距不大
- **更新阶段**：通过 Diff 算法智能计算最小更新范围，显著提升性能
- **批量更新**：可以将多次更新合并处理，减少 DOM 操作次数

## 🤔 其他优势

跨平台

> UI 结构已经描述好了，可以通过不同的渲染引擎进行渲染，而不只是浏览器平台。比如可以渲染到:

- 🖥 桌面应用 (Electron)
- 📱 移动应用 (React Native/Weex)
- 🎮 小程序平台
- 🖨 服务器端渲染(SSR)
