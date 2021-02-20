import { readonly, ref } from 'vue'

export default function useComponentState(initialState: any) {
  const state = ref(initialState)
  const setState = (newState: any) => {
    state.value = newState
  }

  return [readonly(state), setState]
}
