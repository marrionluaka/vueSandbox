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
  @apply bg-red-200 h-0 overflow-hidden transition-all
  &.active
    @apply h-11
</style>
