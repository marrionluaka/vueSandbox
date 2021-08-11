<template lang="pug">
div(data-test="search-page")
  Search(@on-search="onSearch")
  div(data-test="search-page-results")
    ul
      li(v-for="result in searchResuls" :key="result.id") {{ result.title }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'

import { bookService } from '../../api'
import Search from '../../components/sandbox/Search/Search.vue'

export default defineComponent({
  name: 'SearchPage',

  components: { Search },

  setup() {
    const searchResuls: Ref<any[]> = ref([])

    onMounted(async () => await onSearch())

    const onSearch = async (searchTerm: string = '') => {
      const searchResults = await bookService.getBooks(searchTerm)
      searchResuls.value = searchResults
    }

    return { searchResuls, onSearch }
  }
})
</script>
