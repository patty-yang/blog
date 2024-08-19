## mount

mount 主要就是判断了一下是否是已经挂载过，如果没有挂载 然后创建了一个 vnode ，将 appContext 设置到 vnode.appContext 上，随后判断是否是 SSR 渲染，如果是则调用 hydrate，否则调用 render 渲染。

```ts
// packages/runtime-core/src/apiCreateApp.ts
 mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        namespace?: boolean | ElementNamespace,
      ): any {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps)
          vnode.appContext = context

          if (namespace === true) {
            namespace = 'svg'
          } else if (namespace === false) {
            namespace = undefined
          }
// xxx

          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
            render(vnode, rootContainer, namespace)
          }
          isMounted = true
          app._container = rootContainer
          // for devtools and telemetry
          ;(rootContainer as any).__vue_app__ = app

          return getExposeProxy(vnode.component!) || vnode.component!.proxy
        }
      },
```
