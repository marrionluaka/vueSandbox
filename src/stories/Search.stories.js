import Search from '../components/sandbox/Search/index.vue'

export default {
  title: 'Example/Search',
  component: Search
}

const Template = args => ({
  components: { Search },
  template: `<Search />`
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Search'
}
