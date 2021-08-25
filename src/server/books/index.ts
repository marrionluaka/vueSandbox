import { pipe, pluck, uniq, forEach, curry, pick, __, filter, flip, tap } from 'ramda'
// @ts-ignore
import { Factory, Model, hasMany } from 'miragejs'
// @ts-ignore
import faker from 'faker'
import booksDb from './books-db.json'
import { paginate } from './books-pagination'
import { IBook } from '@/entities/book.entity'
import { ICategory } from '@/entities/category.entity'
import { getBooks, sortBooks, bookCategories } from './books-utils'

export default function(server: any) {
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

      this.get('books', ({ db }: any, req: any) => {
        const reversedFilter: any = flip(filter)
        const { limit, page, sort_by } = req.queryParams

        return pipe(
          pick(bookCategories.concat('q')),
          getBooks,
          reversedFilter(db.books),
          sortBooks(sort_by),
          paginate(+limit, +page)
        )(req.queryParams)
      })
      this.get('books/categories', (schema: any) => {
        return schema.categories.all()
      })
    }
  })
}
