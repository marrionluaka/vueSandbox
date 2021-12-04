import { IBook } from '@/features/lib/entities/book.entity'

export interface ISearchResults {
  count: number
  next: number
  prev: number
  results: IBook[]
}

export default function(axios: any) {
  return {
    getBooks,
    getCategories
  }

  async function getBooks(query: string = ''): Promise<ISearchResults> {
    try {
      const { data } = await axios.get(`books?${query}`)
      return data
    } catch (e) {
      throw new Error('Cannot execute getBooks API')
    }
  }

  async function getCategories() {
    try {
      const {
        data: { categories }
      } = await axios.get('books/categories')
      return categories
    } catch (e) {
      throw new Error('Cannot execute getCategories API')
    }
  }
}
