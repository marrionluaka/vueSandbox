<template lang="pug">
.mx-auto.px-5(data-test="search-page" class="md:w-10/12 md:grid md:grid-cols-12 md:gap-x-5")
  header.col-span-full.flex.items-center.justify-center.mt-4.mb-8
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

  nav.col-span-full.px-5(class="lg:col-span-3")
    ul(data-test="search-page-categories")
      li(v-for="category in categories" :key="category.id")
        p.text-2xl.font-bold.capitalize {{ category.name }}
        ul
          li(v-for="option in category.options" :key="option")
            | {{ option }}

  main.col-span-full.px-5(class="lg:col-span-9")
    div(data-test="search-page-results")
      ul(class="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5")
        li.py-2(v-for="result in searchResults" :key="result.id")
          .aspect-w-3.aspect-h-2
            img.object-cover.shadow-lg.rounded-lg(:src='result.img' alt='')
          .text-lg.leading-6.font-medium.space-y-1
            h3 {{ result.title }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'

import { bookService } from '../../api'

import { IBook } from '@/entities/book.entity'
import { ICategory } from '@/entities/category.entity'
import Search from '../../components/sandbox/Search/Search.vue'
import { ChevronIconRight } from '../../components/sandbox/shared'
import SearchItem from '../../components/sandbox/Search/SearchItem.vue'
import SearchAction from '../../components/sandbox/Search/SearchAction.vue'

export default defineComponent({
  name: 'SearchPage',

  components: { Search, SearchItem, SearchAction, ChevronIconRight },

  setup() {
    const searchResults: Ref<IBook[]> = ref([])
    const categories: Ref<ICategory[]> = ref([])
    const suggestedResults: Ref<IBook[]> = ref([])

    onMounted(async () => {
      await onSearch()
      await getCategories()
    })

    const onSearch = _getBooks((books: IBook[]) => (searchResults.value = books))
    const onKeydown = _getBooks((books: IBook[]) => (suggestedResults.value = books.slice(0, 3)))
    const getCategories = async () => (categories.value = await bookService.getCategories())

    function _getBooks(fn: any) {
      return async (searchTerm: string = '') => {
        const books = await bookService.getBooks(searchTerm)
        fn(books)
      }
    }

    return { categories, searchResults, suggestedResults, onSearch, onKeydown }
  }
})
</script>
