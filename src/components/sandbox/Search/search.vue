<template lang="pug">
.search(class="sm:max-w-xs")
  input.search-input(
    type="text"
    v-model="searchInput"
    data-test="search"
    placeholder="Search..."
    class="focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    @keydown="$emit('keydown', $event.target.value)"
    @keydown.enter.prevent
  )

  div(data-test="search-results")
    ul(v-if="suggestedResults.length")
      li(v-if="searchInput")
        SearchAction(@click="$emit('on-search', searchInput)" data-test="submit")
          span Search "{{ searchInput }}" in items

      slot
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue'
import SearchAction from './SearchAction.vue'

export default defineComponent({
  name: 'Search',

  components: { SearchAction },

  props: {
    suggestedResults: {
      type: Array as PropType<any>,
      default: []
    }
  },

  emits: ['on-search', 'keydown'],

  setup() {
    const searchInput: Ref<any> = ref(null)
    return { searchInput }
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
