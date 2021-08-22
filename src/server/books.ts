import { pipe, pluck, uniq, forEach, slice, curry, pick } from 'ramda'
// @ts-ignore
import { Factory, Model, hasMany } from 'miragejs'
// @ts-ignore
import faker from 'faker'
import booksDb from './books-db.json'
import { IBook } from '@/entities/book.entity'
import { ICategory } from '@/entities/category.entity'
import { getBooks, bookCategories } from './books-utils'

export default function(server: any) {
  const limit = curry((lim, arr) => slice(0, lim, arr))
  const getRating = (min: number, max: number): number => parseFloat((Math.random() * (max - min + 1) + min).toFixed(1))
  const getUniqCategory = (books: IBook[], categoryName: string) => pipe<any, any, IBook[]>(pluck(categoryName), uniq)(books)
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
      forEach(category => server.create('category', getCategory(booksDb as IBook[], category)), bookCategories)
    },

    routes() {
      this.namespace = 'api'

      this.get('books', ({ books }: any, req: any) => {
        const searchQuery = pick(bookCategories.concat('q'), req.queryParams)
        return limit(25, books.where(getBooks(searchQuery)))
      })
      this.get('books/categories', (schema: any) => {
        return schema.categories.all()
      })
    }
  })
}
