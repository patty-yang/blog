import { h, createApp, ref } from 'vue'

import { ElDialog } from 'element-plus'
import 'element-plus/dist/index.css'

const componentInstance = ref<any>(null)
export const renderDialog = ({
  component,
  props,
  modalProps
}: {
  component: any
  props: any
  modalProps: any
}) => {
  const open = ref(true)

  const dialog = () =>
    h(
      ElDialog,
      {
        ...modalProps,
        modelValue: open.value,
        beforeClose() {
          unmount()
        }
      },
      {
        default: () =>
          h(component, {
            ...props,
            dialogClose: unmount,
            ref: componentInstance
          }),
        ...modalProps?.slots
      }
    )

  const app = createApp(dialog)
  const div = document.createElement('div')
  document.body.appendChild(div)
  app.mount(div)

  function unmount() {
    open.value = false

    setTimeout(() => {
      app.unmount()
      document.body.removeChild(div)
    }, 1000)
  }

  return { unmount, componentInstance }
}
