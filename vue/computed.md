## computed

<!-- 1. isFunction ? '' : '' -->

```ts
// packages/runtime-core/src/apiComputed.ts
import { type ComputedRefImpl, computed as _computed } from '@vue/reactivity'
export const computed: typeof _computed = (
  getterOrOptions: any,
  debugOptions?: any
) => _computed(getterOrOptions, debugOptions, isInSSRComponentSetup)

// packages/reactivity/src/computed.ts
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions,
  isSSR = false
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
    setter = __DEV__
      ? () => {
          warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)

  if (__DEV__ && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack
    cRef.effect.onTrigger = debugOptions.onTrigger
  }

  return cRef as any
}
```

<Gitalk />
