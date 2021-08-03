import Search from './Search.vue'

export default {
  title: 'Example/Search',
  component: Search,
  argTypes: {
    onSubmit: {}
  }
}

const Template = args => ({
  template: '<Search @on-search="args.onSubmit" />',

  components: { Search },

  setup() {
    return { args }
  }
})

export const Primary = Template.bind({})
