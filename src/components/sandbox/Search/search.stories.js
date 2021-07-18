import Search from './Search.vue'

export default {
  title: 'Example/Search',
  component: Search,
  argTypes: {
    onSubmit: {}
  }
}

const Template = args => ({
  components: { Search },

  setup() {
    return { args }
  },

  template: '<Search v-bind="args" />'
})

export const Primary = Template.bind({})
