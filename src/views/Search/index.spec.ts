import { mount } from '@vue/test-utils'
import { fromPairs, map, pipe, split, pick, toLower, includes, or, trim, ifElse, isEmpty, F } from 'ramda'
import SearchPage from './index.vue'

jest.mock('lodash', () => ({ debounce: jest.fn(fn => fn) }))
jest.mock('../../api', () => ({
  bookService: {
    getBooks: (searchTerm: string) =>
      new Promise((resolve, _) => {
        const books = [
          {
            id: 1,
            author: 'James Clear',
            title: 'Atomic Habits',
            description: 'Lorem ipsum dolor sit amet.',
            rating: 9.7,
            src: 'http://atomic-habits.com'
          },
          {
            id: 2,
            author: 'Ashlee Vance',
            title: 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future',
            description: 'Lorem ipsum dolor sit amet.',
            rating: 8.5,
            src: 'http://elon-musk.com'
          },
          {
            id: 3,
            author: 'some dude',
            title: 'Effortless: Make it Easier to Do What Matters Most',
            description: 'Lorem ipsum dolor sit amet.',
            rating: 8.1,
            src: 'http://effortless.com'
          },
          {
            id: 4,
            author: 'some other dude',
            title: 'The Wright Brothers',
            description: 'Lorem ipsum dolor sit amet.',
            rating: 9.0,
            src: 'http://the-wright-brothers.com'
          }
        ]

        const sanitizeSearch = pipe<string, string, string[], any, any, any>(
          decodeURI,
          split('&'),
          map(pipe(toLower, split('='))),
          fromPairs,
          pick(['q', 'author'])
        )

        const hasBook = (searchTerm: string) => {
          const { q, author } = sanitizeSearch(searchTerm)

          return (item: any): boolean => {
            if (author) {
              if (q) return item.author.toLowerCase().includes(author) || item.title.toLowerCase().includes(q)
              return item.author.toLowerCase().includes(author)
            }
            return item.title.toLowerCase().includes(q)
          }
        }

        return resolve({
          count: books.length,
          next: 2,
          prev: 0,
          results: books.filter(hasBook(searchTerm))
        })
      }),

    getCategories: () =>
      new Promise((resolve, _) => {
        const categories = [
          {
            id: 1,
            name: 'genre',
            options: ['Romance']
          },
          {
            id: 2,
            name: 'author',
            options: ['Ashlee Vance']
          }
        ]
        return resolve(categories)
      })
  }
}))

describe('Search page', () => {
  let wrapper: any

  beforeEach(async () => {
    wrapper = mount(SearchPage)
  })

  afterEach(() => wrapper?.unmount())

  it('renders the search page', () => {
    expect(wrapper.find('[data-test="search-page"]').exists()).toBe(true)
  })

  it('displays initial search results on page load', () => {
    expect(wrapper.find('[data-test="search-page-results"]').html()).toContain('Atomic Habits')
  })

  it('displays new search results on search submit', async () => {
    const title = 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future'

    await wrapper.findComponent({ name: 'Search' }).vm.$emit('on-search', 'Elon')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="search-page-results"]').html()).toContain(title)
  })

  it('displays suggested search results on keydown', async () => {
    const title = 'Effortless: Make it Easier to Do What Matters Most'

    await wrapper.find('[data-test="search"]').setValue('e')
    await wrapper.find('[data-test="search"]').trigger('keydown')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="search-suggested-results"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="search-suggested-results"]').html()).toContain(title)
  })

  it('loads all categories', () => {
    const searchPageCategories = wrapper.find('[data-test="search-page-categories"]').html()

    expect(searchPageCategories).toContain('author')
    expect(searchPageCategories).toContain('genre')
    expect(searchPageCategories).toContain('Romance')
    expect(searchPageCategories).toContain('Ashlee Vance')
  })

  it('updates the search results on category selection', async () => {
    const title = 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future'

    await wrapper.find('[data-test="category-1"] input[type=checkbox]').trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="search-page-results"]').html()).toContain(title)
    expect(wrapper.find('[data-test="search-page-results"]').html()).not.toContain('Atomic Habits')
  })
})
