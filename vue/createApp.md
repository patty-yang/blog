## createApp

实际上`createApp`方法内只是调用了 `const app = ensureRenderer().createApp(...args)【0.1】` 并返回

之后 后调用的是 `createRenderer`

createRenderer 内部调用的是 `baseCreateRenderer`

`baseCreateRenderer` 是 patch、update、mount 等方法实现，但最终只是返回`【0.4】`三个方法，其中`createApp`是调用`createAppAPI`方法

```ts
// packages/runtime-dom/src/index.ts
// 0.1
export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)

  if (__DEV__) {
    injectNativeTagCheck(app)
    injectCompilerOptionsCheck(app)
  }

  const { mount } = app
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    // 0.6 normalizeContainer   判断要mount的元素是否存在
    const container = normalizeContainer(containerOrSelector)
    if (!container) return

    const component = app._component
    if (!isFunction(component) && !component.render && !component.template) {
      // __UNSAFE__
      // Reason: potential execution of JS expressions in in-DOM template.
      // The user must make sure the in-DOM template is trusted. If it's
      // rendered by the server, the template should not contain any user data.
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

    // clear content before mounting
    container.innerHTML = ''
    const proxy = mount(container, false, resolveRootNamespace(container))
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }

  return app
}) as CreateAppFunction<Element>
```

```ts
// 0.2
// packages/runtime-dom/src/index.ts
const rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps)

function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}
```

```ts
// 0.3
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}
```

```ts
// packages/runtime-dom/src/index.ts
// 0.4
function baseCreateRenderer(
  options: RendererOptions,
  createHydrationFns?: typeof createHydrationFunctions
): any {
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  }
}
```

```ts
// 0.5

export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent, rootProps = null) {
    // app 默认配置
    const context = createAppContext()
    // export function createAppContext(): AppContext {
    //   return {
    //     app: null as any,
    //     config: {
    //       isNativeTag: NO,
    //       performance: false,
    //       globalProperties: {},
    //       optionMergeStrategies: {},
    //       errorHandler: undefined,
    //       warnHandler: undefined,
    //       compilerOptions: {},
    //     },
    //     mixins: [],
    //     components: {},
    //     directives: {},
    //     provides: Object.create(null),
    //     optionsCache: new WeakMap(),
    //     propsCache: new WeakMap(),
    //     emitsCache: new WeakMap(),
    //   }
    // }

    // 已经安装的 plugin
    const installedPlugins = new WeakSet()
    // 是否渲染
    let isMounted = false

    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,

      get config() {
        return context.config
      },

      set config(v) {
        if (__DEV__) {
          warn(
            `app.config cannot be replaced. Modify individual options instead.`
          )
        }
      },

      use(plugin: Plugin, ...options: any[]) {},

      mixin(mixin: ComponentOptions) {},

      component(name: string, component?: Component): any {},

      directive(name: string, directive?: Directive) {},

      mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        namespace?: boolean | ElementNamespace
      ): any {},

      unmount() {},

      provide(key, value) {},

      runWithContext(fn) {}
    })

    if (__COMPAT__) {
      installAppCompatProperties(app, context, render)
    }

    return app
  }
}
```

```ts
// 0.6
function normalizeContainer(
  container: Element | ShadowRoot | string
): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container)
    if (__DEV__ && !res) {
      warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      )
    }
    return res
  }
  if (
    __DEV__ &&
    window.ShadowRoot &&
    container instanceof window.ShadowRoot &&
    container.mode === 'closed'
  ) {
    warn(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    )
  }
  return container as any
}
```

## mount

```ts
const app = ensureRenderer().createApp(...args)

const { mount } = app
app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
  // 0.6 normalizeContainer   判断要mount的元素是否存在
  const container = normalizeContainer(containerOrSelector)
  if (!container) return

  const component = app._component
  if (!isFunction(component) && !component.render && !component.template) {
    // __UNSAFE__
    // Reason: potential execution of JS expressions in in-DOM template.
    // The user must make sure the in-DOM template is trusted. If it's
    // rendered by the server, the template should not contain any user data.
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

  // clear content before mounting
  container.innerHTML = ''
  const proxy = mount(container, false, resolveRootNamespace(container))
  if (container instanceof Element) {
    container.removeAttribute('v-cloak')
    container.setAttribute('data-v-app', '')
  }
  return proxy
}

return app
```

<Gitalk />
