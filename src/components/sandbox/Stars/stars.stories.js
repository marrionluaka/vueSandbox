import Stars from './stars.vue'

export default {
  title: 'Example/Stars',
  component: Stars
}

export const Primary = () => ({
  components: { Stars },
  template: '<Stars />'
})
