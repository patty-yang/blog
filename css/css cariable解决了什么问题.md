## 减少 css 充分定义

```css
:root {
  --bg-color: blue;
  --color: pink;
}
p {
  color: var(--color);
}
div {
  color: var(--color);
  background-color(--bg-color);
}
```

## 简化了 js 对 dom 设置的介入

[CSS 变量对 JS 交互组件开发带来的提升与变革-张鑫旭](https://www.zhangxinxu.com/wordpress/2020/07/css-var-improve-components/)
