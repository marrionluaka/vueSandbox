<template lang="pug">
div(data-test="search-page")
  Search(:suggestedResults="suggestedResults" @on-search="onSearch" @keydown="onKeydown")
    li.bg-white(data-test="search-suggested-results")
      .flex.items-center.justify-between.p-3.border-b.border-gray-200
        p.font-medium.capitalize Title
        a.uppercase.text-sm.font-bold.text-indigo-500(href='#') View All
      ul
        li(v-for='result in suggestedResults' :key='result.id')
          SearchItem.flex.justify-between.items-center(:src='result.src')
            .flex.items-center
              .mr-4.my-1.p-2.border.rounded-xl.border-gray-200 Img
              div
                p.text-sm.font-medium {{ result.title }}
                p.text-sm.font-light.text-gray-500 {{ result.description }}
            span.bg-indigo-500.text-white.px-2.py-1.rounded-lg.text-sm.font-bold {{ result.rating }}
    li.bg-white
      .p-3.border-b.border-gray-200
        p.font-medium Genres
      SearchAction(@click='() => {}')
        .flex.justify-between.items-center
          p.text-sm  Historical
          ChevronIconRight.transform.scale-75.text-gray-500

  div(data-test="search-page-results")
    ul
      li(v-for="result in searchResults" :key="result.id") {{ result.title }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'

import { bookService } from '../../api'

import Search from '../../components/sandbox/Search/Search.vue'
import { ChevronIconRight } from '../../components/sandbox/shared'
import SearchItem from '../../components/sandbox/Search/SearchItem.vue'
import SearchAction from '../../components/sandbox/Search/SearchAction.vue'

export default defineComponent({
  name: 'SearchPage',

  components: { Search, SearchItem, SearchAction, ChevronIconRight },

  setup() {
    const searchResults: Ref<any[]> = ref([])
    const suggestedResults: Ref<any[]> = ref([])

    onMounted(async () => await onSearch())

    const onSearch = _getBooks((books: any) => (searchResults.value = books))
    const onKeydown = _getBooks((books: any) => (suggestedResults.value = books.slice(0, 3)))

    function _getBooks(fn: any) {
      return async (searchTerm: string = '') => {
        const books = await bookService.getBooks(searchTerm)
        fn(books)
      }
    }

    return { searchResults, suggestedResults, onSearch, onKeydown }
  }
})
</script>
