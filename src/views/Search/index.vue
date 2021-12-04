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

  nav.col-span-full.mb-4(class="md:col-span-6 md:mb-0 lg:col-span-4")
    Filters(:categories="categories" @on-selected-category="onSelectedCategory")

  main.col-span-full.px-5(class="md:col-span-6 lg:col-span-8")
    .flex.justify-end
      .flex.items-center
        p.font-semibold.mr-2.font-sans.text-sm Sort By:
        select.border-0.pl-0.font-light.text-sm(class="focus:ring-0" v-model="sortOptions.selected" @change="onSortResults($event)" data-test="search-page-sort")
          option(v-for="option in sortOptions.options" :value="option.value") {{ option.display }}

    div(data-test="search-page-results")
      ul(class="md:grid lg:grid-cols-2 md:gap-x-5")
        li.py-2(v-for="result in searchResults.results" :key="result.id")
          .aspect-w-3.aspect-h-2
            img.object-cover.shadow-lg.rounded-lg(:src='result.img' alt='' loading="lazy")
          .text-lg.leading-6.font-medium.space-y-1
            h3 {{ result.title }}

    button(v-if="hasMoreResults" data-test="load-more" @click="onLoadMoreResults") Load More
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref, Ref } from 'vue'
import { append, reject, find, ifElse, propEq, map, over, lensProp, concat, __, pipe, flip } from 'ramda'

import { bookService } from '@/features/api/client/books'
import { IBook } from '@/features/lib/entities/book.entity'
import { ICategory } from '@/features/lib/entities/category.entity'
import { buildQuery } from '@/features/lib/modules/queryBuilder'
import { ISearchResults } from '@/features/api/client/books/book-api'

import Filters from './Filters.vue'
import Search from '@/features/lib/components/Search/index.vue'
import SearchItem from '@/features/lib/components/Search/SearchItem.vue'
import SearchAction from '@/features/lib/components/Search/SearchAction.vue'
import { ChevronIconRight, ChevronIcon } from '@/features/lib/components/shared'

interface IQuery {
  key: string
  value: string | number
}

interface ISortOption {
  selected: string
  options: ISortOptionItem[]
}

interface ISortOptionItem {
  value: string
  display: string
}

export default defineComponent({
  name: 'SearchPage',

  components: {
    Search,
    Filters,
    SearchItem,
    SearchAction,
    ChevronIcon,
    ChevronIconRight
  },

  setup() {
    const defaultQuery = [
      { key: 'limit', value: 12 },
      { key: 'sort_by', value: 'title' }
    ]

    const searchTerm: Ref<string> = ref('')
    const sortOptions: Ref<ISortOption> = ref({} as ISortOption)
    const latestQuery: Ref<IQuery[]> = ref(defaultQuery)
    const categories: Ref<ICategory[]> = ref([])
    const suggestedResults: Ref<IBook[]> = ref([])
    const selectedCategories: Ref<any[]> = ref([])
    const searchResults: Ref<ISearchResults> = ref({} as ISearchResults)

    const hasMoreResults: ComputedRef<boolean> = computed(() => searchResults.value.count > searchResults.value.results?.length)

    onMounted(async () => {
      await onSearch()
      categories.value = _setFilters(await bookService.getCategories())
      sortOptions.value = {
        selected: 'title',
        options: [
          { value: 'title', display: 'Alphabetical' },
          { value: 'rank', display: 'Highest Rank' },
          { value: '-rank', display: 'Lowest Rank' },
          { value: 'release_date', display: 'Release Date' }
        ]
      }
    })

    async function onSearch(search: string = '') {
      await _getBooks((bookResults: ISearchResults) => (searchResults.value = bookResults), search)
    }

    async function onKeydown(search: string = '') {
      await _getBooks((bookResults: ISearchResults) => (suggestedResults.value = bookResults.results.slice(0, 3)), search)
    }

    async function onLoadMoreResults() {
      const query = buildQuery((latestQuery.value = _setQuery('page', [{ key: 'page', value: searchResults.value.next }])))
      const bookResults = await bookService.getBooks(query)

      searchResults.value = { ...bookResults, results: searchResults.value.results.concat(bookResults.results) }
    }

    async function onSortResults(e: Event) {
      const query = buildQuery(
        (latestQuery.value = _setQuery('sort_by', [{ key: 'sort_by', value: (e.target as HTMLInputElement).value }]))
      )
      searchResults.value = await bookService.getBooks(query)
    }

    async function onSelectedCategory(category: string, value: string) {
      latestQuery.value = _removePageQuery(latestQuery.value)
      const listOfCategories = _getSelectedCategories(category, value, selectedCategories.value)
      const query = buildQuery((latestQuery.value = _setQuery(category, listOfCategories)))

      searchResults.value = await bookService.getBooks(query)
      selectedCategories.value = listOfCategories
    }

    return {
      categories,
      sortOptions,
      searchResults,
      hasMoreResults,
      suggestedResults,
      onSearch,
      onKeydown,
      onSortResults,
      onLoadMoreResults,
      onSelectedCategory
    }

    async function _getBooks(fn: any, search: string = '') {
      latestQuery.value = _removePageQuery(latestQuery.value)
      const query = buildQuery((latestQuery.value = _setQuery('q', [{ key: 'q', value: search }])))
      const books = await bookService.getBooks(query)

      searchTerm.value = search
      fn(books)
    }

    function _removePageQuery(latestQuery: IQuery[]): IQuery[] {
      return reject(x => x.key === 'page', latestQuery)
    }

    function _getSelectedCategories(category: string, value: string, list: any[]) {
      const hasValue = propEq('value', value)
      return ifElse(find(hasValue) as any, reject(hasValue), append({ key: category, value }))(list)
    }

    function _setQuery(key: string, updates: Array<{ [key: string]: string | number }>) {
      return pipe<any, any, any>(reject(propEq('key', key)), flip(concat)(updates))(latestQuery.value)
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
  }
})
</script>
