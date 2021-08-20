import { IBook } from '@/entities/book.entity'

export default function(axios: any) {
  return Object.freeze({
    getBooks,
    getCategories
  })

  async function getBooks(query: string = ''): Promise<IBook[]> {
    try {
      const {
        data: { books }
      } = await axios.get(`books?${query}`)
      return books
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
