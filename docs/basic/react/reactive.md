## 在 react中 借助 proxy 实现 vue3 的 reactive
TODO: 待处理
<!-- ```typescript
    function useReactive(initialState) {
        const [state, setState] = useState(initialState)

        useEffect(() => {
            const handler = {
                get(target, property){
                    return target[property]
                },
                set(target, property, value) {
                    setState({
                        ...target
                    })
                    return true
                }
            }
            initialState = new Proxy(initialState, handler)
        }, []) 
    }
```


```js
    function App() {
        const state = useReactive({ count: 1});
        state.count += 1;
    }
``` -->