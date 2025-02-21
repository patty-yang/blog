## box-sizing

```css
.container {
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 5px solid;
  box-sizing: content-box;
}
/*
    width = 100px + 10px + 10px + 5px + 5px
    height = 100px + 10px + 10px + 5px + 5px
*/

.container {
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 5px solid;
  box-sizing: border-box;
}

/*
    width: 10px + 10px + 5px + 5px + content-width = 100px
    height: 10px + 10px + 5px + 5px + content-height = 100px
*/
```

## css3新增属性

- 视觉属性
  - 阴影
    - box-shadow
    - text-shadow
  - 圆角
    - border-radius
  - 背景渐变
    - gradient
  - 变形
    - translate 平移
    - scale 缩放
    - rotate 旋转
  - 过渡动画
    - transition
    - animation
- 布局
  - flex

  ```text
      只要将父元素设置为 display: flex，那么就会变成一个弹性盒
      所有的子元素就会变成弹性项 子元素会沿着主轴方向自动排列且拉伸
  ```

  - grid

    ```css
      .container {
        grid-template-columns: 50px 50px 50px; /*一共三列 每一列50px*/
        /*grid-template-columns: repeat(3, 50px) 一共三列 每一列50px */
        /*grid-template-columns: 100px 1fr 1fr; 三列，第一列100px 第二列第三列自适应 */
        gap: 4px 10px;  // 行间隙 列间隙
        justify-items: ;
        align-items: ;

    }
        .sub{
            grid-area: 2/3/3/5     /*根据grid布局的位置，可以占据指定位置的区域*/
        }
      ```

- 伪元素选择器
  - ::before
  - ::after

## 图像内容适应

```object-fit``` 控制多媒体内容与元素的适应方式，大多数应用在 ```img```或```video```元素中

- default: fill
  - fill: 保持原始宽高，填充整个容器
  - contain: 保持原始宽高比，将内容完全包含在容器中
  - cover: 保持原始宽高比，覆盖整个容器
  - none: 不缩放，只显示原图
  - scale-down: 与none类似，但如果图片尺寸大于容器，则使用scale-down进行缩放

## 视口单位

  ```vw``` 和 ```vh```

- vw: viewport width，视口宽度
- vh: viewport height，视口高度

## 平滑滚动

scroll-behavior: smooth
