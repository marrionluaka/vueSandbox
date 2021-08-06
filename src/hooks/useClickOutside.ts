import { onMounted, onUnmounted, ref, Ref } from 'vue'

export const useClickOutside = (el: Ref<any>) => {
  const isActive: Ref<boolean> = ref(false)

  const onOutsideClick = (e: Event) => {
    if (!(el.value == e.target || el.value.contains(e.target))) isActive.value = false
  }

  onMounted(() => window.addEventListener('click', onOutsideClick.bind(null, el.value)))
  onUnmounted(() => window.removeEventListener('click', onOutsideClick.bind(null, el.value)))

  return { isActive }
}
