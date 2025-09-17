# 🎨 Button 按钮组件

## 使用方式分析

### 基础用法

- 直接使用，无需传递任何参数即可渲染默认按钮

### 属性配置

- `type` - 主题颜色
- `size` - 按钮尺寸
- `plain` - 朴素按钮，仅显示边框
- `round` - 圆角按钮
- `disabled` - 禁用状态

### 事件支持

- `click` - 点击事件
- `focus` - 获得焦点
- `blur` - 失去焦点

## 📁 目录结构

- src/components/Button

1. 创建基本按钮
   ```vue
   <template>
     <button class="c-button">
       <slot />
     </button>
   </template>
   ```
2. 增加样式

   ```scss
   .c-button {
     // xxxx.... 默认样式
     font-weight: var(--button-font-weight);
     user-select: none;
     vertical-align: middle;
     padding: 12px 20px;
     background-color: var(--button-bg-color);
     border: var(--border);
     border-color: var(--button-border-color);
     color: var(--button-text-color);
     font-size: var(--font-size-base);
     border-radius: var(--border-radius-base);
   }

   .c-button {
     --button-font-weight: var(--font-weight-primary);
     --button-border-color: var(--border-color);
     --button-bg-color: var(--fill-color-blank);
     --button-text-color: var(--text-color-regular);
     --button-disabled-text-color: var(--disabled-text-color);
     --button-disabled-bg-color: var(--fill-color-blank);
     --button-disabled-border-color: var(--border-color-light);
     --button-hover-text-color: var(--color-primary);
     --button-hover-bg-color: var(--color-primary-light-9);
     --button-hover-border-color: var(--color-primary-light-7);
     --button-active-text-color: var(--button-hover-text-color);
     --button-active-border-color: var(--color-primary);
     --button-active-bg-color: var(--button-hover-bg-color);
     --button-outline-color: var(--color-primary-light-5);
     --button-active-color: var(--text-color-primary);

     &:hover,
     &:focus {
       // xxx
     }

     &:active {
       // xx
     }
   }
   ```

   - 至此默认样式已经设置完、普通按钮就可以使用了

3. 根据主题色生成 button 的颜色
   也就是根据 type 改一下样式 变量
   ```scss
   @each $type in primary, success, warning, danger, info {
     // [!code ++]
     .c-button--#{$type} {
       --button-text-color: var(--color-white);
       --button-bg-color: var(--color-#{$type});
       --button-border-color: var(--color-#{$type});
       --button-outline-color: var(--color-#{$type}-light-5);
       --button-active-color: var(--color-#{$type}-dark-2);
       --button-hover-text-color: var(--color-white);
       --button-hover-bg-color: var(--color-#{$type}-light-3);
       --button-hover-border-color: var(--color-#{$type}-light-3);
       --button-active-bg-color: var(--color-#{$type}-dark-2);
       --button-active-border-color: var(--color-#{$type}-dark-2);
       --button-disabled-text-color: var(--color-white);
       --button-disabled-bg-color: var(--color-#{$type}-light-5);
       --button-disabled-border-color: var(--color-#{$type}-light-5);
     }
   } // [!code ++]
   ```
   ```vue
   <template>
     <button
       class="c-button"
       :class="{
         // [!code ++]
         [`c-button--${type}`]: type // [!code ++]
       }"
     >
       <span> // [!code ++] <slot /> // [!code ++] </span> // [!code ++]
     </button>
   </template>
   ```

后续流程类似，根据传递进的值给增加对应的 class 改变样式变量

4. 如 round

   ```vue
   <template>
     <button
       class="c-button"
       :class="{
         [`c-button--${type}`]: type
         'is-round': round,  // [!code ++]
       }"
     >
       <span>
         <slot />
       </span>
     </button>
   </template>
   ```

   ```scss
   .c-button {
     //.....

     &:hover,
     &:focus {
       // xxx
     }

     &:active {
       // xx
     }
     &.is-round {   // [!code ++]
       border-radius: var(--border-radius-round); // [!code ++]
     } // [!code ++]
   }
   ```
