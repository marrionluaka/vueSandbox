import { mount } from '@vue/test-utils'
import AccordionTitle from './AccordionTitle.vue'

describe('AccordionTitle spec', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount<any>(AccordionTitle, {
      slots: {
        default: `
          <template #default>
            I am a Title!!
          </template>
        `
      }
    })
  })

  afterEach(() => wrapper?.unmount())

  it('renders an AccordionTitle', () => {
    expect(wrapper.find('[data-test="accordion-title"]').exists()).toBe(true)
    expect(wrapper.html()).toContain('I am a Title!')
  })
})
