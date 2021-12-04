import {
  filter,
  reverse,
  sortBy,
  prop,
  toLower,
  flip,
  curry,
  of,
  any,
  pick,
  all,
  split,
  ifElse,
  includes,
  reduce,
  keys,
  KeyValuePair
} from 'ramda'
import { IBook } from '@/features/lib/entities/book.entity'

export const bookCategories = ['author', 'genre', 'volume_sales', 'publisher', 'publication_date', 'imprint']

export const sortBooks = curry((needle: string, haystack: IBook[]) => {
  if (!needle) return haystack

  if (needle.includes('-')) return reverse(sortBy(prop<string, any>(needle.replace('-', '')), haystack))

  return sortBy(prop<string, any>(needle), haystack)
})

export function getBooks(query: any, books: IBook[]): IBook[] {
  const search = _updateSearchKey(query)
  const qKeys = keys(search)
  const selectedQueries = _getSelectedQueries(search)

  const flippedIncludes = flip(includes)
  const getBook = (key: string, book: IBook) => toLower(prop<string, any>(key, pick(qKeys, book)))
  const hasBook = curry((book, key) => any(flippedIncludes(getBook(key, book)), selectedQueries[key]))

  return filter((book: IBook) => all(hasBook(book), qKeys), books)
}

function _getSelectedQueries(query: any) {
  const getValuesFromQuery = ifElse(includes('|'), split('|'), of)
  const setObj = (acc: any, key: string) => {
    acc[key] = getValuesFromQuery(query[key])
    return acc
  }
  return reduce(setObj, {} as KeyValuePair<string, any>, keys(query) as any)
}

function _updateSearchKey(obj: any) {
  const reducer = (acc: any, k: string) => {
    if (k.includes('q')) {
      acc.title = toLower(obj[k])
    } else {
      acc[k] = toLower(obj[k])
    }
    return acc
  }
  return reduce(reducer, { title: '' }, keys(obj) as any)
}
