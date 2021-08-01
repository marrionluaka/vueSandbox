<template lang="pug">
.checkbox
  input.checkbox-input(
    type="checkbox"
    :id="id"
    :name="name"
    :value="value"
    class="focus:ring-indigo-500"
    @input="$emit('input', $event.target.value)"
  )
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Checkbox',

  props: {
    id: {
      type: String as PropType<string>,
      required: true
    },
    name: {
      type: String as PropType<string>,
      required: true
    },
    value: {
      type: String as PropType<any>,
      required: true
    }
  },
  emits: ['input']
})
</script>

<style lang="stylus" scoped>
.checkbox
  @apply flex items-center h-5
  &-input
    @apply h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer
</style>
