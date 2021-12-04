<template lang="pug">
li.flex.justify-center.items-center(:class="[$props.isActive ? $props.activeClass : $props.inactiveClass]")
  router-link.block.relative.w-full.h-16.w-16.flex.justify-center.items-center(to="#" @click.prevent="$emit('onNavigate', $props.to)")
    span.transform.scale-125
      slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    activeClass: {
      type: String,
      required: false,
      default: 'text-indigo-600 bg-gray-100'
    },
    inactiveClass: {
      type: String,
      required: false,
      default: 'text-gray-800 hover:text-gray-500'
    }
  }
})
</script>
