import { customRef } from 'vue'
import { debounce } from 'lodash'

export const debounceRef = (value, delay = 1000) => {
  return customRef((track, trigger) => {
    let _value = value

    const _debounce = debounce((val) => {
      _value = val
      trigger()
    }, delay)

    return {
      get() {
        track()
        return _value
      },
      set(v) {
        _debounce(v)
      },
    }
  })
}
