import { mount } from '@vue/test-utils'
import Stars from './stars.vue'

describe('Stars spec', () => {
  let wrapper: any

  it('renders stars', () => {
    wrapper = mount(Stars, {})
    expect(wrapper.get('[data-test="stars"]').exists()).toBe(true)
  })

  it('emits a rating out of 5', async () => {
    wrapper = mount<any>(Stars, {
      propsData: {
        ratings: 5,
        defaultRating: 3
      }
    })

    await wrapper.get('[data-test="rating-4"]').trigger('click')

    expect(wrapper.findAll('[data-test^="rating-"]')).toHaveLength(5)
    expect(wrapper.emitted('click')[0]).toEqual([4])
  })
})
