import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  name: 'Search',

  emits: ['on-search'],

  setup(_, { emit }) {
    const searchInput: Ref<any> = ref(null)
    const onSubmit = () => emit('on-search', searchInput.value)

    return { onSubmit, searchInput }
  }
})
