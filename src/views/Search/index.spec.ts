import { mount } from '@vue/test-utils'
import SearchPage from './index.vue'
import * as booksApi from '../../api'

jest.mock('lodash', () => ({ debounce: jest.fn(fn => fn) }))

describe('Search page', () => {
  let wrapper: any
  let getBooks: any
  let getCategoriesSpy: any

  beforeEach(async () => {
    getBooks = jest.spyOn(booksApi.bookService, 'getBooks').mockImplementation(
      () =>
        new Promise((res, rej) => {
          return res({ count: 2, next: 2, prev: 1, results: [] })
        })
    )
    getCategoriesSpy = jest.spyOn(booksApi.bookService, 'getCategories').mockImplementation(
      () =>
        new Promise((res, rej) => {
          return res([
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
          ])
        })
    )
    wrapper = mount(SearchPage)
  })

  afterEach(() => wrapper?.unmount())

  it('renders the search page', () => {
    expect(wrapper.find('[data-test="search-page"]').exists()).toBe(true)
  })

  it('displays initial search results on page load', () => {
    expect(getBooks).toBeCalledWith('limit=12&sort_by=title&q=')
  })

  it('displays new search results on search submit', async () => {
    await wrapper.findComponent({ name: 'Search' }).vm.$emit('on-search', 'Elon')
    expect(getBooks).toBeCalledWith('limit=12&sort_by=title&q=Elon')
  })

  it('displays categories', () => {
    expect(getCategoriesSpy).toBeCalled()
  })

  it('updates the search results on category selection', async () => {
    await wrapper.find('[data-test="category-1"] input[type=checkbox]').trigger('input')
    await wrapper.vm.$nextTick()

    expect(getBooks).toBeCalledWith('limit=12&sort_by=title&q=&author=Ashlee%20Vance')
  })

  it('loads more content when the user reaches the end of the page and clicks the load more button', async () => {
    await wrapper.find('[data-test="load-more"]').trigger('click')
    expect(getBooks).toBeCalledWith('limit=12&sort_by=title&q=')
  })

  it('sorts results in alphabetical order', async () => {
    const options = wrapper.find('[data-test="search-page-sort"]').findAll('option')

    await options[0].setSelected()

    expect(getBooks).toBeCalledWith('limit=12&sort_by=title&q=')
  })

  it.skip('resets all filters', async () => {
    expect(wrapper.find('[data-test="category-1"] input[type=checkbox]').element.checked).toBe(false)

    await wrapper.find('[data-test="category-1"] input[type=checkbox]').setChecked()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="category-1"] input[type=checkbox]').element.checked).toBe(true)

    await wrapper.find('[data-test="reset-filters"]').trigger('click')

    expect(wrapper.find('[data-test="category-1"] input[type=checkbox]').element.checked).toBe(false)
  })
})
