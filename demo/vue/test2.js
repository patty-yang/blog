import {ref, watchEffect} from 'vue'

const state = ref({
    a: 1
})


const k = state.value

const n = k.a

watchEffect(() => {
    console.log('start')
    state.value.a
    k.a
})

setTimeout(() => {
    // state.value.a = 2
    state.value = {a:1}
}, 500)


setTimeout(() => {
    k.a = 11 // 当 state.value = {a:1} 的时候，更改k.a 改的是代理对象 所以会重新运行
    // state.value.a = 2
}, 1000)


setTimeout(() => {
   state.value.a = 100
}, 1000)