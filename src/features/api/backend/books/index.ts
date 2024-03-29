import { pipe, pluck, uniq, forEach, curry, pick } from 'ramda'
// @ts-ignore
import { Factory, Model, hasMany } from 'miragejs'
// @ts-ignore
import faker from 'faker'
import booksDb from './books-db.json'
import { paginate } from './books-pagination'
import { IBook } from '@/features/lib/entities/book.entity'
import { ICategory } from '@/features/lib/entities/category.entity'
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
        img: () => faker.image.unsplash.imageUrl(640, 480, 'nature', '')
      })
    },

    seeds() {
      forEach(book => server.create('book', book), booksDb)
      forEach(category => server.create('category', getCategory(booksDb as IBook[], category)), bookCategories)
    },

    routes() {
      this.namespace = 'api'

      this.get('books', ({ db }: any, req: any) => {
        const { limit = 5, page = 0, sort_by } = req.queryParams
        const allowedQueryParams = pick(bookCategories.concat('q'), req.queryParams)
        return pipe<IBook[], any[], any[]>(sortBooks(sort_by), paginate(+limit, +page))(getBooks(allowedQueryParams, db.books))
      })
      this.get('books/categories', (schema: any) => {
        return schema.categories.all()
      })
    }
  })
}
