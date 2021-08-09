import { mount } from '@vue/test-utils'
import Search from './index.vue'

describe('Search page', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Search)
  })

  afterEach(() => wrapper?.unmount())

  it.todo('renders the search page')
  it.todo('displays initial search results on page load')
  it.todo('displays new search results on search submit')
  it.todo('displays suggested search results')
})
