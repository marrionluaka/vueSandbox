<template lang="pug">
form(@submit.prevent="onSubmit")
  input(
    v-model="searchInput",
    placeholder="Search...",
    type="text",
    data-test="search"
  )
  button(type="submit" data-test="submit") Search
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Search',

  emits: ['on-search'],

  setup(_, { emit }) {
    const searchInput = ref(null)
    const onSubmit = () => {
      emit('on-search', searchInput.value)
    }

    return {
      onSubmit,
      searchInput
    }
  }
})
</script>
