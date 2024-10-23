## useState

```ts
// 首先默认结构是这样的
// 一个 so easy 的 Container Page
const Container = () => {
    const [str, setStr] = useState('')

    const changeStr = () => {
        setStr(setStr += '1')
    }
    return (
        <div> {str} </div>
        <button onclick={changeStr}></button>
    )
}

export function renderer() {
  initIndex = 0
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  root.render(<Container />)
}
```

实现：

- 接受一个默认值，返回一个数组
- 支持多次调用
- 更新 state 时，重新渲染

```ts
// 存储每次调用时，给 state 的 value
// 记录位置

let stateArray: any[] = [];
let initIndex: number = 0;
const useMyState = <T>(initState: T): [T, (newState: T) => void] => {
  const currentIndex = initIndex;
  startArray[currentIndex] = stateArray[currentIndex] || initState;
  function setState(newState: T) {
    startArray[currentIndex] = newState;
    renderer();
  }
  ++initIndex;
  return [stateArray[currentIndex], stState];
};
```

> 所以这就是为什么不能在循环中使用 useState 的原因，当 index 错误的话 state 不就乱了嘛

## useEffect

好，上面是 useState，useEffect 的实现和 useState 蕾丝

实现:

- 没有传递依赖项，每次都触发 callback
- 兼容多次调用
- 上次 render 和 本次 render 的依赖比较，在依赖发生变化时，执行 callback

```ts
const allDeps = [];
const currentIndex = 0;
const useEffect = (callback: () => void, depArray?: any[]) => {
  // 当没有传递依赖项时，每次都触发 callback
  if (!depArray) {
    callback();
    allDeps[currentIndex] = depArray;
    currentIndex++;
    return false;
  }
  const deps = allDeps[currentIndex];
  // 比较
  const hasChange = deps
    ? depArray.some((it, index) => it !== deps[index])
    : true;
  if (hasChange) {
    callback();
    allDeps[currentIndex] = depArray;
  }
  currentIndex++;
};
```
