## 顺序

[createApp]()

[mount]() TODO Rewrite

[render]()

[ref|reactive]()

[computed]()

<!-- [watch]()

[watchEffect]() -->

### baseHandlers get 中 key 的类型

```ts
export enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw'
}
```
