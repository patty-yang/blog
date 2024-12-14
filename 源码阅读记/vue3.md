## Vue3

## 根据过程分析源码

- package.json
- monorepo 项目的 package/包
- 分析流程

  - xxx.vue 文件要经过编译 **compiler-sfc**
  - 应用初始化 **runtime-core**
  - 组件挂载 **runtime-core**
  - 数据响应式处理 **reactivity**
  - 触发数据更新 **runtime-core**
  - 将数据更新同步到视图 **runtime-dom**
  - 卸载

- 阶段
  - sfc 编译
  - 响应系统的初始化
  - 依赖收集
    `/packages/reactivity/src/collectionHandlers.ts`
    一旦响应式中的属性被访问，通过调用 track 处理。
    <!-- 1. proxy 代理，在 get 方法中，决定追踪策略，然后通过自定义的 track 进行属性追踪，在依赖 map 中追加对应的追踪逻辑 -->
  - 响应式属性更新
  - 重新渲染组件
  - 更新完成

```js
  <script src="../dist/vue.global.js"></script>

<div id="app">{{ count }}</div>

<script>
  const { createApp, ref } = Vue
  Vue.createApp({
    setup() {
      const count = ref(0)
      return {
        count
      }
    }
  }).mount('#app')
</script>

```

## createApp

- 1. 首先从入口 `createApp` 开始分析

```js
export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)

  if (__DEV__) {
    injectNativeTagCheck(app)
    injectCompilerOptionsCheck(app)
  }

  const { mount } = app
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    // _component => createApp 传入的根组件
    const component = app._component
    if (!isFunction(component) && !component.render && !component.template) {
      // __UNSAFE__
      // Reason: potential execution of JS expressions in in-DOM template.  原因:在in- dom模板中可能执行JS表达式。
      // The user must make sure the in-DOM template is trusted. If it's //用户必须确保in-DOM模板是可信的。如果它是
      // rendered by the server, the template should not contain any user data. //由服务器呈现，模板不应该包含任何用户数据。
      component.template = container.innerHTML
      // 2.x compat check
      if (__COMPAT__ && __DEV__) {
        for (let i = 0; i < container.attributes.length; i++) {
          const attr = container.attributes[i]
          if (attr.name !== 'v-cloak' && /^(v-|:|@)/.test(attr.name)) {
            compatUtils.warnDeprecation(
              DeprecationTypes.GLOBAL_MOUNT_CONTAINER,
              null
            )
            break
          }
        }
      }
    }

    // clear content before mounting 挂载前清空内容
    container.innerHTML = ''
    const proxy = mount(container, false, container instanceof SVGElement)
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }

  return app
}) as CreateAppFunction<Element>

```

**_第一步_**

- 首先是调用了 <font color="#fFF0000"> ensureRenderer </font> 方法， 判断了 `renderer` 是否存在 如果不存在的话调用 <font color="#fFF0000"> createRenderer </font> 创建一个 `renderer`

```ts
function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}
```

- 在 <font color="#fFF0000"> createRenderer </font> 中，调用了 <font color="#fFF0000"> baseCreateRenderer </font> ，有 2359 - 325 行（完了再看），

```js
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer < HostNode, HostElement > options
}
```

**_第二步_**

调用 `ensureRenderer` 方法中的 `createApp` 方法 拿到实例对象赋值给 app

**_第三步_**

判断当前环境是否是 `dev`

injectNativeTagCheck => 在 app 上的 config 属性中，新增一个 `isNativeTag` 属性，并通过 `writable: false` 设置为不能修改该属性的值

injectCompilerOptionsCheck => 在 app 上的 config 属性中，新增一个 `isCustomElement` 属性，并在进行`set`时候，给出错误提示信息（应该是缺少编辑依赖）

```js
function injectNativeTagCheck(app: App) {
  // Inject `isNativeTag`
  // this is used for component name validation (dev only)
  Object.defineProperty(app.config, 'isNativeTag', {
    value: (tag: string) => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  })
}

// dev only
function injectCompilerOptionsCheck(app: App) {
  if (isRuntimeOnly()) {
    const isCustomElement = app.config.isCustomElement
    Object.defineProperty(app.config, 'isCustomElement', {
      get() {
        return isCustomElement
      },
      set() {
        warn(
          `The \`isCustomElement\` config option is deprecated. Use ` +
            `\`compilerOptions.isCustomElement\` instead.`
        )
      }
    })

    const compilerOptions = app.config.compilerOptions
    const msg =
      `The \`compilerOptions\` config option is only respected when using ` +
      `a build of Vue.js that includes the runtime compiler (aka "full build"). ` +
      `Since you are using the runtime-only build, \`compilerOptions\` ` +
      `must be passed to \`@vue/compiler-dom\` in the build setup instead.\n` +
      `- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.\n` +
      `- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n` +
      `- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`

    Object.defineProperty(app.config, 'compilerOptions', {
      get() {
        warn(msg)
        return compilerOptions
      },
      set() {
        warn(msg)
      }
    })
  }
}
```

**_第四步_**

解构 mount 方法，并进行了重写

> 在挂载前清空 container 元素的内容
> 将元素上的 `v-cloak` 替换为 `data-v-app`

**_第五步_**
返回 app 实例

## ref

**_第一步_**
发现是调用了 <font color="#fFF0000"> createRef </font> 方法，传递默认值和 false

```js
export function ref(value?: unknown) {
  return createRef(value, false)
}

export function shallowRef(value?: unknown) {
  return createRef(value, true)
}
```

在 <font color="#fFF0000"> createRef </font> 中，接受两个参数: 需要转换的默认值 及 是否是浅响应式（因为 shallowRef 同样调用了 createRef 方法）

判断是否已经是 ref 类型的数据，是的话直接返回，否则返回一个 RefImpl 实例

**_第二步_**

```js
function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

**_第三步_** <font color="#fFF0000"> RefImpl </font>

```js

class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true
  // 在 RefImpl 类中，接受两个值，一个是 `value`，一个用来判断是否是浅响应式 `__v_isShallow`
  constructor(value: T, public readonly __v_isShallow: boolean) {
    // toRaw 获取到原始类型数据
    this._rawValue = __v_isShallow ? value : toRaw(value)
    //  toReactive => 如果value是对象的话调用调用 reactive   or  value
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    // 当获取 RefImpl 上的 value 时，触发 trackRefValue() 收集依赖 并返回当前值
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    // 当 value 发生变化时
    if (hasChanged(newVal, this._rawValue)) {
      // 更新
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      // 重新更新依赖
      triggerRefValue(this, newVal)
    }
  }
}

```

## reactive
**_第一步_**
  首先会判断是否是 readonly 的, 如果是 readonly 的就直接返回，要不就是 return createReactiveObject()

// createReactiveObject 

