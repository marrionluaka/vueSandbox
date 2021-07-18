import { shallowMount } from '@vue/test-utils'
import Search from './Search.vue'

describe('Search specs', () => {
  let wrapper: any

  beforeEach(() => (wrapper = shallowMount(Search)))

  it('renders a search input.', () => {
    expect(wrapper.get('form').exists()).toBe(true)
  })

  it('performs a search.', async () => {
    await wrapper.get("[data-test='search']").setValue('google search')
    await wrapper.get("[data-test='submit']").trigger('submit')

    expect(wrapper.emitted('on-search')[0]).toEqual(['google search'])
  })
})
