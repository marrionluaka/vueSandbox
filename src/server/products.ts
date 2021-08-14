import { pipe, map, uniq, forEach, slice, curry } from 'ramda'
// @ts-ignore
import { Factory, Model, hasMany } from 'miragejs'
// @ts-ignore
import faker from 'faker'
import booksDb from './books-db.json'

const getUniqGenres = pipe(
  map((x: any) => x.genre),
  uniq
)

const limit = curry((lim, arr) => slice(0, lim, arr))

const getRating = (min: number, max: number): number => parseFloat((Math.random() * (max - min + 1) + min).toFixed(1))

const containsSearchTerm = curry((searchTerm: string, book: any) => book.title.toLowerCase().includes(searchTerm))

export default function(server: any) {
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
        img: () => faker.image.unsplash.imageUrl(640, 480, 'books', 'books')
      })
    },

    seeds() {
      forEach(book => server.create('book', book), booksDb)
      forEach(category => server.create('category', { category }), getUniqGenres(booksDb))
    },

    routes() {
      this.get('/api/books', ({ books }: any, req: any) => {
        const filteredBooks = books.where(containsSearchTerm(req.queryParams.q))
        return limit(25, filteredBooks.length ? filteredBooks : books.all())
      })
      this.get('/api/books/categories', (schema: any) => {
        return schema.categories.all()
      })
    }
  })
}
