## 长列表优化

虚拟列表

设置一个可视区域，用户在滚动的时候修改的时候，本质上是动态修改可是区域的内容

### 每一项`定高`的情况下

需要如下信息

1. startIndex 可视区域起始位置索引
2. endIndex 可是区域结束为止索引
3. 可视区域内容数据
4. 整个列表的偏移位置 startOffset

虚拟列表 dom 结构设计如下

```html
<!--
 infinite-list-container: 可视区域容器
 infinite-list-phantom: 占位容器，高度是总列表高度，用于形成滚动条
 infinite-list: 列表渲染区域
 infinite-list-item: 列表项
 -->
<div class="infinite-list-container">
    <div class="infinite-list-phantom""></div>
    <div class="infinite-list">
        <div class="infinite-list-item"></div>
        <div class="infinite-list-item"></div>
        <div class="infinite-list-item"></div>
        <div class="infinite-list-item"></div>
    </div>
</div>
```

```css
.infinite-list-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.infinite-list-phantom,
.infinite-list {
  position: absolute;
  left: 0;
  top: 0;
}
```

然后监听 `infinite-list-container` 的 `scroll` 事件，获取滚动元素的 `scrollTop`

假定可视区域高度固定，称为 screenHeight  
假定列表中每一项高度固定，称为 itemSize  
假定列表数据称为 listData
假定当前滚动位置为 scrollTop

那么可以计算出

列表总高度: `listHeight = listData.length * itemSize`  
可显示的列表项数: `visibleCount = Math.ceil(screenHeight / itemSize)`  
起始位置: `startIndex = Math.floor(scrollTop / itemSize)`  
结束位置: `endIndex = startIndex + visibleCount`  
列表数据: `listData.slice(startIndex, endIndex)`

当发生滚动后，由于渲染区域相对于可视区域发生了偏移，然后用 transform 将 list 重新移回可视区域
偏移量: `startOffset = scrollTop - (scrollTop % itemSize)`

### 发现的问题

1. 仅渲染可视区域的内容，如果用户滚动过快，会出现白屏闪烁的问题
2. 动态高度

#### 动态高度计算

高度 动态计算的话 那么就面临几个问题

1. 如何获取真实高度
   - `采用预估`一个高度渲染真实 DOM ，`再根据 DOM 的时机情况去设置真实高度`
   - 创建一个缓存列表，其中列表项字段为索引、高度与定位，并`预估列表项高度`用于`初始化缓存列表`。在渲染后根据 DOM 时机情况更新缓存列表
2. 相关属性的计算有什么变化
   `根据缓存列表重写计算属性、滚动回掉函数`，如列表总高度的计算可以使用缓存列表最后一项的定位字段的值
3. 列表的渲染方式有什么变化  
   渲染页面的数据是根据 `startIndex/endIndex` 来激素呐的，所以保证索引计算的正确性就无需变化

   - startIndex 修改: 在`缓存列表`中 搜索第一个底部元素大于 `列表垂直偏移量` 的项并返回它的索引
   - endIndex: 无需修改

#### 白屏闪烁

添加缓存区，整个渲染区域由 `可视区域 + 缓存区` 组成，缓存区用于解决白屏闪烁的问题

TODO: 将代码树立一下 粘贴 v1.0.0 v1.0.0 v1.0.2 版本
