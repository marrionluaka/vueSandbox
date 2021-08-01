import Checkbox from './Checkbox.vue'

export default {
  title: 'Example/Checkbox',
  component: Checkbox
}

const Template = args => ({
  components: { Checkbox },

  setup() {
    return { args }
  },

  template: '<Checkbox v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  id: 'my-id',
  name: 'country',
  value: 'CA'
}
