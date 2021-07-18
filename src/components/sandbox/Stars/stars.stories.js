import Stars from './Stars.vue'

export default {
  title: 'Example/Stars',
  component: Stars,
  argTypes: {
    // -- Name of the method returned to the template in your component
    onClick: {}
  }
}

const Template = args => ({
  components: { Stars },

  setup() {
    return { args }
  },

  template: '<Stars v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  color: 'gold'
}
