import { RouterLink } from 'vue-router'
import { mount, createLocalVue, Wrapper } from '@vue/test-utils'

import SearchItem from './SearchItem.vue'

describe('SearchItem specs', () => {
  const localVue = createLocalVue()
  localVue.resolveComponent('RouterLink')

  let wrapper: Wrapper<any>

  beforeEach(() => {
    wrapper = mount<any>(SearchItem, {
      localVue,
      slots: {
        default: `
          <p>Search result 1</p>
        `
      }
    })
  })

  it('renders a search item', () => {
    expect(wrapper.find('[data-test="search-item"]').exists()).toBe(true)
  })

  it('renders a slot', () => {
    expect(wrapper.html()).toContain('<p>Search result 1</p>')
  })

  it('renders a link', () => {
    expect(wrapper.find('[data-test="search-link"]').exists()).toBe(true)
  })
})
