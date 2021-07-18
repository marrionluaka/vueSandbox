import { defineComponent, PropType, ref, Ref } from 'vue'

export default defineComponent({
  name: 'Stars',

  props: {
    ratings: {
      type: Number as PropType<number>,
      default: 5
    },
    defaultRating: {
      type: Number as PropType<number>,
      default: 3
    }
  },

  emits: ['click'],

  setup(props) {
    const stars: Ref<number[]> = ref([...Array(props.ratings)].map((_, i) => i + 1))
    return { stars }
  }
})
