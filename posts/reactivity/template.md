---
title: vue 模版
date: 2024-05-02
tags:
  - vue
---


# Vue 模板

vue 中的模版到最终也是会通过**模版编译器**编译为渲染函数的形式

所以可以使用`h、render` 来书写组件，只要返回一个 VNode 就可以描述组件视图

![Vue 虚拟 DOM 的结构](https://raw.githubusercontent.com/patty-yang/pic/img/test/20250316234053.png)

## 模版编译

单文件组件中的模版，对于 **模版编译器**来讲，就是一堆字符串。它的处理过程是这样的。

![模版编译的过程](https://raw.githubusercontent.com/patty-yang/pic/img/test/template.png)

#### 模版编译的三个阶段

1. **解析器 (Parser)**

   - 输入: 模版字符串
   - 输出: 模版 AST
   - 功能: 将原始模版解析成抽象语法树

2. **转换器 (Transformer)**

   - 输入: 模版 AST
   - 输出: JavaScript AST
   - 功能: 对 AST 进行语义分析和转换

3. **生成器 (Generator)**
   - 输入: JavaScript AST
   - 输出: 渲染函数
   - 功能: 生成最终的可执行代码

可以通过 [astexplorer](https://astexplorer.net/) 工具来查看编译后的 AST 结构。

**输入模版:**

```vue
<template>
  <div>
    <h1>hello world</h1>
  </div>
</template>
```

**解析器输出的 模版 AST:**

```json
{
  "type": 0,
  "children": [
    {
      "type": 1,
      "tag": "template",
      "children": [
        {
          "type": 1,
          "tag": "div",
          "children": [
            {
              "type": 1,
              "tag": "h1",
              "children": [
                {
                  "type": 2,
                  "content": "hello world"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**转换器输出的 JS AST:**

```json
{
  "type": "FunctionDecl",
  "id": {
    "type": "Identifier",
    "name": "render"
  },
  "params": [],
  "body": [
    {
      "type": "ReturnStatement",
      "return": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "h"
        },
        "arguments": [
          {
            "type": "StringLiteral",
            "value": "div"
          },
          {
            "type": "ArrayExpression",
            "elements": [
              {
                "type": "CallExpression",
                "callee": {
                  "type": "Identifier",
                  "name": "h"
                },
                "arguments": [
                  {
                    "type": "StringLiteral",
                    "value": "hello"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
```

**生成器的结果**

```js
function render() {
  return h('div', [h('h1', 'hello world')])
}
```

```js
function compile(template) {
  // 1. 解析器
  const ast = parse(template)
  // 2. 转换器
  const jsAst = transForm(ast)
  // 3. 生成器
  const code = generate(jsAst)
}
```

## 模版编译的时机

1. 运行时编译
   当通过 CDN 方式引入 Vue 时，模版的编译会在**运行时**进行,实时将模版转换为渲染函数

2. 预编译
   在工程化的开发环境中，模版会在**构建阶段**完成编译。编译后是不存在模版的

借助了 `vite-plugin-inspect` 插件查看文件编译后的结果

![](https://raw.githubusercontent.com/patty-yang/pic/img/test/compile.png)
