# ICON 组件

## 📁 目录结构

在项目的组件目录下创建 Icon 组件文件： `src/component/Icon.vue`

1.  安装 `fortawesome` 依赖

    ```json
    {
      "@fortawesome/fontawesome-svg-core": "^6.6.0",
      "@fortawesome/free-solid-svg-icons": "^6.6.0",
      "@fortawesome/vue-fontawesome": "^3.0.8"
    }
    ```

2.  引入 `fortawesome` 组件
3.  对 `fortawesome` 提供的内容进行二次封装
4.  传入 `fortawesome` 默认配置

    1.  ```vue
        <template>  // [!code ++]
          <font-awesome-icon v-bind="props" /> // [!code ++]
        </template> // [!code ++]

        <script lang="ts" setup> // [!code ++]
        import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome' // [!code ++]
        const props = defineProps<FontAwesomeIconProps>() // [!code ++]
        </script> // [!code ++]
        ``` 

    2.  扩展 type

        ```scss
        @each $key, $color in primary, success, warning, danger, info { // [!code ++]
          .c-icon-#{$key} { // [!code ++]
            --icon-color: var(--color-#{$key}); // [!code ++]
        } // [!code ++]
        ```

        ```vue
        <template>
          <i class="c-icon" :class="{ [`c-icon-${type}`]: type }"> // [!code ++]
            <font-awesome-icon v-bind="filterProps" /> 
          </i> // [!code ++]
        </template>
        <script setup lang="ts">
        import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
        import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome' 
        import { computed } from 'vue' // [!code ++]

        interface Props extends FontAwesomeIconProps { // [!code ++]
          type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' // [!code ++]
        } // [!code ++]
        const props = defineProps<Props>() 

        defineOptions({
          name: 'CIcon'
        })
        const filterProps = computed(() => { // [!code ++]
          const { type, ...rest } = props // [!code ++]
          return rest // [!code ++]
        }) // [!code ++]
        </script>
        ```
