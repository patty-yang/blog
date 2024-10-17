## 水平垂直居中

```html
<div class="container">
  <div class="item">固定宽度的快级元素</div>
</div>
```

### flex

```css
/* 1.  */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. */
.container {
  display: flex;
}
.item {
  margin: auto;
}
```

### grid

```css
.container {
  display: grid;
}
.item {
  margin: auto;
}
```

### position

```css
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

## 伪类和伪元素区别

|                     `伪类`                      |           `伪元素`            |
| :---------------------------------------------: | :---------------------------: |
|  :hover - 在元素悬停在上方时，给该元素添加样式  | ::before - 在元素之前插入内容 |
| :first-child - 元素的第一个子元素添加特殊的样式 | ::after - 在元素之后插入内容  |

---

```js
     伪类只是给元素 增加/修改 css 样式
    // ul:first-child{
    //     color:red
    // }

    伪元素 仿照了一个元素，添加了对应的效果
    // ul::before{
    //     content: 'before-content'
    // }

    不同之处:
    1. 可以同时使用多个伪类，但只能使用一个伪元素
    2. 伪类不会创建 新的虚拟元素，而伪元素会
    3. 伪类使用 : 单冒号  伪元素使用:: 双冒号
```

## 线形进度条

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .bar {
        height: 20px;
        width: 300px;
        background-color: #f5f5f5;
        margin: 5px 0 10px;
      }
      .bar::before {
        counter-reset: progress var(--percent);
        content: counter(progress) '%\2002';
        display: block;
        width: calc(300px * var(--percent) / 100);
        font-size: 12px;
        color: #fff;
        background-color: #2486ff;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="bar" style="--percent: 10"></div>
    <button class="btn"></button>
  </body>

  <script>
    let num = 60;
    const bar = document.querySelector('.bar');
    const btn = document.querySelector('.btn');

    btn.onclick = () => {
      num -= 1;
      bar.setAttribute('style', `--percent: ${num} `);
    };
  </script>
</html>
```

## 元素隐藏方式的区别

1. `display: none;`
   > 元素直接消失，会导致页面的重绘和重排
2. `visibility: hidden`
   > DOM 还存在，仅是处在一个不可见状态，不会触发重排，但是会导致重绘
3. `opacity: 0`
   > DOM 还存在，仅是处在一个不可见的状态， 可以触发到事件监听
4. `z-index: -99`
   > 将层级设置为底，使其不可见

## 左侧 300px 右侧自适应

```html
<div class="container">
  <div class="left">left</div>
  <div class="main">main</div>
</div>
```

### flex

```css
.container {
  display: flex;
}
.left {
  flex-basis: 300px;
  flex-shrink: 0;
}
.main {
  flex-grow: 1;
}
```

### grid

```css
.container {
  display: grid;
  grid-template-columns: 300px 1fr;
}
```

### 浮动 + BFC

```css
.left {
  float: left;
  width: 300px;
}
.main {
  overflow: hidden;
}
```

## BFC

### 什么是 BFC

`BFC(块级格式上下文)` 拥有一个自己布局规则的容器，其内部的布局不受外部的影响。

### 创建 BFC 的条件

- 元素设置浮动 `float`
- 元素设置定位 position: `absolute、fixed`
- 元素设置 display : `inline-block、flex`
- 元素设置 overflow : `hidden、auto、scroll`

### BFC 容器特点

- 垂直方向上，自上而下排列
- 相邻两个容器的 margin
- 计算 BFC 高度时，会把浮动元素也计算
- 容器不会和浮动容器发生重叠
- 内部元素不会影响到外部元素
- 每个元素左 margin 与容器的左 border 相接触

## css 权重

## flex
