import { pipe, pluck, uniq, forEach, slice, curry, takeLast } from 'ramda'
// @ts-ignore
import { Factory, Model, hasMany } from 'miragejs'
// @ts-ignore
import faker from 'faker'
import booksDb from './books-db.json'

export default function(server: any) {
  const xx = ['author', 'genre', 'volume_sales', 'publisher', 'publication_date', 'imprint']
  const limit = curry((lim, arr) => slice(0, lim, arr))

  const getUniqCategory = (books: any, categoryName: string) => pipe(pluck(categoryName), uniq)(books)

  const getRating = (min: number, max: number): number => parseFloat((Math.random() * (max - min + 1) + min).toFixed(1))

  const containsSearchTerm = curry((searchTerm: string, book: any): boolean => book.title.toLowerCase().includes(searchTerm))

  const getCategory = curry((books: any, categoryName: string) => ({
    name: categoryName,
    type: ['volume_sales', 'publication_date'].includes(categoryName) ? 'range' : 'selection',
    options: getUniqCategory(books, categoryName)
  }))

  server.config({
    models: {
      category: Model.extend({
        books: hasMany()
      }),
      book: Model.extend({
        categories: hasMany()
      })
    },

    factories: {
      book: Factory.extend({
        src: '#',
        rating: () => getRating(5, 9),
        release_date: () => faker.date.past().toLocaleDateString(),
        img: () => faker.image.lorempixel.imageUrl(640, 480, 'abstract', true)
      })
    },

    seeds() {
      forEach(book => server.create('book', book), booksDb)
      forEach(category => server.create('category', getCategory(booksDb, category)), xx)
    },

    routes() {
      this.namespace = 'api'

      this.get('books', ({ books }: any, req: any) => {
        const filteredBooks = books.where(containsSearchTerm(req.queryParams.q))
        return limit(25, filteredBooks.length ? filteredBooks : books.all())
      })
      this.get('books/categories', (schema: any) => {
        return schema.categories.all()
      })
    }
  })
}
