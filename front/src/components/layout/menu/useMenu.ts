import { ref } from 'vue'

const isVisible = ref<boolean>(false)

export default function useMenu () {
  const toggle = () => {
    isVisible.value = !isVisible.value
  }

  const hide = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    toggle,
    hide
  }
}
