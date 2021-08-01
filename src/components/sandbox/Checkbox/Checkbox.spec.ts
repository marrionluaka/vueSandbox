import { mount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'

describe('Checkbox spec', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount<any>(Checkbox, {
      propsData: {
        id: 'country',
        name: 'canada',
        value: 'CA'
      }
    })
  })

  afterEach(() => wrapper?.unmount())

  it('renders an Checkbox', () => {
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('displays attributes passed in.', async () => {
    await wrapper.vm.$forceUpdate()

    expect(wrapper.find('input[type="checkbox"]').attributes('id')).toBe('country')
    expect(wrapper.find('input[type="checkbox"]').attributes('name')).toBe('canada')
    expect(wrapper.find('input[type="checkbox"]').element.value).toBe('CA')
  })

  it('emits an "input" event.', async () => {
    await wrapper.find('input[type="checkbox"]').trigger('input')
    expect(wrapper.emitted('input')[0][0]).toBe('CA')
  })
})
