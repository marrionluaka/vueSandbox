<template lang="pug">
.accordion-panel(:class="{ active: isOpen }" data-test="accordion-panel")
  slot
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  }
})
</script>

<style lang="stylus" scoped>
.accordion-panel
  @apply max-h-0 overflow-hidden transition-all ease-in-out
  &.active
    @apply max-h-screen transition-all
</style>
