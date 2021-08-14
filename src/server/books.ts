import { pipe, pluck, uniq, forEach, slice, curry, toLower, includes } from 'ramda'
// @ts-ignore
import { Factory, Model, hasMany } from 'miragejs'
// @ts-ignore
import faker from 'faker'
import booksDb from './books-db.json'
import { IBook } from '@/entities/book.entity'
import { ICategory } from '@/entities/category.entity'

export default function(server: any) {
  const listOfCategories = ['author', 'genre', 'volume_sales', 'publisher', 'publication_date', 'imprint']

  const limit = curry((lim, arr) => slice(0, lim, arr))

  const getLower = (search: string, title: string): boolean => pipe(toLower, includes(search))(title)

  const getUniqCategory = (books: IBook[], categoryName: string) => pipe<any, any, IBook[]>(pluck(categoryName), uniq)(books)

  const getRating = (min: number, max: number): number => parseFloat((Math.random() * (max - min + 1) + min).toFixed(1))

  const containsSearchTerm = curry((searchTerm: string, book: IBook): boolean => getLower(searchTerm, book.title))

  const getCategoryType = (categoryName: string) => (['volume_sales', 'publication_date'].includes(categoryName) ? 'range' : 'selection')

  const getCategory = curry(
    (books: IBook[], categoryName: string): ICategory => ({
      name: categoryName,
      type: getCategoryType(categoryName),
      options: getUniqCategory(books, categoryName)
    })
  )

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
      forEach(category => server.create('category', getCategory(booksDb as IBook[], category)), listOfCategories)
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
