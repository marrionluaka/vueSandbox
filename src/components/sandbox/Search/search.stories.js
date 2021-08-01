import Search from './Search.vue'

export default {
  title: 'Example/Search',
  component: Search,
  argTypes: {
    onSubmit: {}
  }
}

const Template = args => ({
  template: '<Search v-bind="args" />',

  components: { Search },

  setup() {
    return { args }
  }
})

export const Primary = Template.bind({})
