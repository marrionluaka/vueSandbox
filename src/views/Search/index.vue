<template lang="pug">
div(data-test="search-page")
  div(data-test="search-page-results")
    ul
      li(v-for="result in searchResuls" :key="result.id") {{ result.title }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { getAllBooks } from '../../api/book-api'

export default defineComponent({
  setup() {
    const searchResuls: Ref<any[]> = ref([])

    onMounted(async () => {
      const books = await getAllBooks()
      searchResuls.value = books
    })

    return { searchResuls }
  }
})
</script>
