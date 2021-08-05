import { mount } from '@vue/test-utils'
import Search from './Search.vue'

describe('Search specs', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount<any>(Search, {
      propsData: {
        suggestedResults: [
          { id: 1, value: 'Result 1' },
          { id: 2, value: 'Result 2' },
          { id: 3, value: 'Result 3' }
        ]
      },
      slots: {
        default: `
          <template #default>
            <li>Result 1</li>
          </template>
        `
      }
    })
  })

  it('performs a search', async () => {
    await wrapper.find("[data-test='search']").setValue('google search')
    await wrapper.find("[data-test='submit']").trigger('click')

    expect(wrapper.find("[data-test='submit']").text()).toContain('Search "google search" in items')
    expect(wrapper.emitted('on-search')[0]).toEqual(['google search'])
  })

  it('emits a "keydown" event for each key stroke', async () => {
    await wrapper.find('[data-test="search"]').setValue('cat')
    await wrapper.find('[data-test="search"]').trigger('keydown')

    expect(wrapper.emitted('keydown')[0][0]).toBe('cat')
  })

  it('does not search when the "enter key" is pressed', async () => {
    await wrapper.find('[data-test="search"]').setValue('cat')
    await wrapper.trigger('keydown.enter')

    expect(wrapper.emitted('keydown')).toBeFalsy()
  })

  it('displays suggested results', async () => {
    //new RegExp("^(" + this.term + ")", "i")
    expect(wrapper.html()).toContain('Result 1')
    expect(wrapper.find('[data-test="search-results"]').exists()).toBe(true)
  })
})
