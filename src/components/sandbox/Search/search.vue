<template lang="pug">
form(@submit.prevent="onSubmit")
  .search(class="sm:max-w-xs")
    input.search-input(
      v-model="searchInput",
      placeholder="Search...",
      type="text",
      data-test="search"
      class="focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    )
    button.search-btn(class="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" type="submit" data-test="submit") Search
</template>

<script lang="ts">
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
</script>

<style lang="stylus" scoped>
.search
  @apply w-full flex items-center
  &-input
    @apply shadow-sm block w-full border-gray-300 px-4 rounded-full
  &-btn
    @apply ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-full text-white bg-indigo-600
</style>
