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

  nav.col-span-full(class="lg:col-span-3")
    //- button(data-test="reset-filters" @click="resetFilters") Reset filters
    ul(data-test="search-page-categories")
      li(v-for="(category, i) in categories" :key="category.id")
        Accordion(:isOpen="true")
          template(#title)
            AccordionTitle(@click="currentPanel = category.id")
              .flex.justify-between.py-2
                p.text-xl.font-bold.capitalize {{ removeUnderscore(category.name) }}
                ChevronIcon.transition-transform.ease-in-out.transform.scale-75(:class="[isOpen(category.id) ? 'rotate-0' : 'rotate-90']")

          AccordionPanel(:isOpen="isOpen(category.id)")
            ul.h-72.overflow-y-scroll(:data-test="`category-${i}`")
              li(v-for="(option, idx) in category.options" :key="option.value")
                Checkbox(:id="option.value" :isChecked="option.selected" :name="option.value" :value="option.value" @update:modelValue="onSelectedCategory(category.name, $event)") {{ option.value }}

  main.col-span-full.px-5(class="lg:col-span-9")
    div(data-test="search-page-results")
      ul(class="md:grid sm:grid-cols-2 md:gap-x-5")
        li.py-2(v-for="result in searchResults.results" :key="result.id")
          .aspect-w-3.aspect-h-2
            img.object-cover.shadow-lg.rounded-lg(:src='result.img' alt='')
          .text-lg.leading-6.font-medium.space-y-1
            h3 {{ result.title }}
    button(data-test="load-more" @click="loadMore") Load More
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { append, reject, find, ifElse, propEq, map, over, set, lensProp, lensPath } from 'ramda'

import { bookService } from '../../api'
import { ISearchResults } from '../../api/book-api'

import { IBook } from '@/entities/book.entity'
import { ICategory } from '@/entities/category.entity'

import { useQueryBuilder } from '../../hooks/useQueryBuilder'

import Search from '../../components/sandbox/Search/Search.vue'
import SearchItem from '../../components/sandbox/Search/SearchItem.vue'
import SearchAction from '../../components/sandbox/Search/SearchAction.vue'
import { ChevronIconRight, ChevronIcon } from '../../components/sandbox/shared'

import Accordion from '../../components/sandbox/Accordion/Accordion.vue'
import AccordionPanel from '../../components/sandbox/Accordion/AccordionPanel.vue'
import AccordionTitle from '../../components/sandbox/Accordion/AccordionTitle.vue'

import Checkbox from '../../components/sandbox/Checkbox/Checkbox.vue'

export default defineComponent({
  name: 'SearchPage',

  components: {
    Search,
    SearchItem,
    SearchAction,
    ChevronIcon,
    ChevronIconRight,
    Accordion,
    AccordionPanel,
    AccordionTitle,
    Checkbox
  },

  setup() {
    const searchTerm: Ref<string> = ref('')
    const currentPanel: Ref<number> = ref(0)
    const categories: Ref<ICategory[]> = ref([])
    const suggestedResults: Ref<IBook[]> = ref([])
    const selectedCategories: Ref<any[]> = ref([])
    const searchResults: Ref<ISearchResults> = ref({} as ISearchResults)

    const { buildQuery } = useQueryBuilder()

    onMounted(async () => {
      await onSearch()
      await getCategories()
    })

    const isOpen = (x: number) => x === currentPanel.value
    const removeUnderscore = (str: string) => str.replace('_', ' ')
    const onSearch = _getBooks((bookResults: ISearchResults) => (searchResults.value = bookResults))
    const onKeydown = _getBooks((bookResults: ISearchResults) => (suggestedResults.value = bookResults.results.slice(0, 3)))

    const getCategories = async () => {
      const listOfCategories = await bookService.getCategories()
      categories.value = _setFilters(listOfCategories)
    }

    const loadMore = async () => {
      if (searchResults.value.count === searchResults.value.results.length) return

      const query = buildQuery(_getLatestQuery().concat({ key: 'page', value: searchResults.value.next }))
      const books = await bookService.getBooks(query)
      searchResults.value = { ...books, results: searchResults.value.results.concat(books.results) }
    }

    const onSelectedCategory = async (category: string, value: string) => {
      const listOfCategories = _getSelectedCategories(category, value, selectedCategories.value)
      const bookResults = await bookService.getBooks(buildQuery(_getLatestQuery().concat(listOfCategories)))

      searchResults.value = bookResults
      selectedCategories.value = listOfCategories
    }

    function _getSelectedCategories(category: string, value: string, list: any[]) {
      const hasValue = propEq('value', value)
      return ifElse(find(hasValue) as any, reject(hasValue), append({ key: category, value }))(list)
    }

    function _getBooks(fn: any) {
      return async (search: string = '') => {
        const books = await bookService.getBooks(buildQuery(_getLatestQuery(search)))
        searchTerm.value = search
        fn(books)
      }
    }

    function _getLatestQuery(search: string = searchTerm.value) {
      return [
        { key: 'q', value: search },
        { key: 'limit', value: 12 },
        { key: 'sort_by', value: 'title' }
      ]
    }

    function _setFilters(listOfCategories: any[]) {
      return map(
        over(
          lensProp<any, string>('options'),
          map(value => ({ value, selected: false }))
        ),
        listOfCategories
      )
    }

    return {
      categories,
      currentPanel,
      searchResults,
      suggestedResults,
      isOpen,
      loadMore,
      onSearch,
      onKeydown,
      removeUnderscore,
      onSelectedCategory
    }
  }
})
</script>
