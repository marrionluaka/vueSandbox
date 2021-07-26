import Tweet from './Tweet.vue'

export default {
  title: 'Example/Tweet',
  component: Tweet,
  argTypes: {
    onSubmit: {}
  }
}

const Template = args => ({
  components: { Tweet },

  setup() {
    return { args }
  },

  template: '<Tweet v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  charLimit: 140
}
