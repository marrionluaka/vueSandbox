import Search from './index.vue'

export default {
  title: 'Example/Search',
  component: Search
}

export const Primary = () => ({
  components: { Search },
  template: '<Search />'
})
