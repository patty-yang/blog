## JavaScript 重学路线

<div class="learning-path">

### 1. 基础知识

- [JavaScript 基础](base)
  - 语法基础
  - 数据类型
  <!-- - 运算符
  - 控制流程 -->
- [es6+](es6+)
  - 数组
  - 对象
  - 函数
  - [事件循环](eventLoop)
  - [promise](promise)
  - [webAPI](webAPI)

### 2. 布局与渲染

- [尺寸和位置](size)
  - 盒模型
  - 定位
  - 布局计算
- [浏览器渲染](browserRender)
  - 渲染流程
  - 性能优化
  - 动画处理

### 3. html5/css3

- [css3](css3)
  - 选择器
  - 布局
  - 动画
  - 视觉效果
- [html5](html5)
  - 语义化标签
  - 表单
  - 多媒体
  - 新特性

### 4. 迭代器与生成器

- [迭代器](iterator)
  - Iterator 接口实现
  - 可迭代对象
  - for...of 循环
  - 内置迭代器
- [生成器](generator)
  - Generator 函数语法
  - yield 表达式
  - 异步应用

### 5. 集合类型

- [Set 集合](type-set/set)
  - 基本用法与特性
  - 常用方法
  - 与数组转换
- [Map 字典](type-set/map)
  - 键值对操作
  - 遍历方法
  - 实践应用
- [WeakMap](type-set/weak)
  - 弱引用特性
  - 内存管理
  - 使用场景
- [WeakSet](type-set/weak)
  - 对象存储
  - 垃圾回收
  - 最佳实践

</div>

<style>
.learning-path {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.learning-path h3 {
    color: #2c3e50;
    margin-top: 1.5em;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
}

.learning-path ul {
    list-style-type: none;
    padding-left: 20px;
    /*color: red;*/
}

.learning-path a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
}

.learning-path a:hover {
    color: #2980b9;
}
</style>
