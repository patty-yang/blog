---
title: 移动端适配
date: 2022-09-15
tags:
  - js
---

### 设备像素 (物理像素)

设备像素是显示设备中最小的物理显示单元。每个像素都是一个能发出红(R)、绿(G)、蓝(B)三色光的发光点，通过调节这三种颜色的强度，可以混合产生各种不同的色彩。

#### 分辨率

分辨率参数代表了设备像素。例如：

- 分辨率 2340 × 1080 表示：
  - 水平方向：2340 个像素点
  - 垂直方向：1080 个像素点

> 💡 早期手机屏幕采用横向设计是因为需要预留物理按键区域。随着全面屏时代的到来，竖向设计成为主流，以提供更好的用户体验。

### 屏幕尺寸和像素密度(PPI)

- **屏幕尺寸**：通常以英寸为单位，表示屏幕对角线的长度（如：6.67 英寸）
- **像素密度(PPI - Pixels Per Inch)**：
  - 定义：每英寸所包含的像素数量
  - 计算：基于屏幕分辨率和物理尺寸

### CSS 像素

也被称为：

- 设备独立像素
- 逻辑像素

## 如何去做适配呢?

> 适配也就是让浏览器内容在每一个手机上显示的内容是一致的

- 百分比适配
- viewport 适配，也就是将所有的 css 像素(设备宽度) 设置为一样的
  ** ❌ 缺点**
  - 各种大小的设备看到的是一样的
  - 值在小数的时候，会出现一些误差
  - 对设计稿的测量存在一些问题
- DPR 适配
  - 🤔 指的是 像素比: 物理像素 / css 像素
- rem 适配
  - 就是把所有的设备分成若干份，再计算**元素宽度所占的份数**
  - css3 相对单位，相对于跟元素的 font-size
  - 流行方案
    ```js
    ;(function (doc, win, designWidth) {
      const html = doc.documentElement // 获取 html 跟元素
      function refreshRem() {
        const width = html.clientWidth // 获取设备的宽度
        if (width >= designWidth) {
          // 当设备宽度大于设计稿的时候
          html.style.fontSize = '100px'
        } else {
          // 比例计算
          html.style.fontSize = 100 * (width / designWidth) + 'px'
        }
      }
      doc.addEventListener('DOMContentLoaded', refreshRem)
    })(document, window, 750) // 750 -> 设计稿的宽度
    ```
- vw vh vmin vmax

## 调用摄像头 📸

- MediaDevices API
  通过 `navigator.mediaDevices.getUserMedia()` 可以访问用户的摄像头和麦克风：
- input:file
  通过 `<input type="file" capture=""> ` 可以访问用户的摄像头和麦克风：

## 横竖屏切换

- orientationchange 当设备的方向发生改变时，会触发该事件。 后来已经被废弃
- Screen Orientation API 使用的时候需要 can i use 查看一下兼容性
  可以通过 `screen.orientation` 获取设备的方向：
  - `screen.orientation.type` 获取设备的方向类型
  - `screen.orientation.lock()` 锁定设备的方向
  - `screen.orientation.unlock()` 解锁设备的方向

## 打电话

```js
window.location.href = 'tel:123456789'
```

## 发短信

```js
window.location.href = 'sms:123456789?body=hello world'
```
