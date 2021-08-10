import { mount } from '@vue/test-utils'

import SearchPage from './index.vue'

jest.mock('../../api', () => ({
  bookService: {
    getAllBooks: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: 'Atomic Habits',
        description: 'Lorem ipsum dolor sit amet.',
        rating: 9.5,
        src: 'http://atomic-habits.com'
      }
    ])
  }
}))

describe('Search page', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(SearchPage)
  })

  afterEach(() => wrapper?.unmount())

  it('renders the search page', () => {
    expect(wrapper.find('[data-test="search-page"]').exists()).toBe(true)
  })

  it('displays initial search results on page load', () => {
    expect(wrapper.find('[data-test="search-page-results"]').html()).toContain('Atomic Habits')
  })
  it.todo('displays new search results on search submit')
  // await wrapper.findComponent({ name: 'Search' }).vm.$emit('on-search', 'Elons')
  it.todo('displays suggested search results')
})
