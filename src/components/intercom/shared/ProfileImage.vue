<template lang="pug">
img.h-9.w-9.rounded-full.object-cover.my-2(
  :alt="$props.alt"
  :src="$props.src"
)
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    alt: {
      type: String,
      default: 'Profile Image'
    },
    src: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.35&w=144&h=144&q=80'
    }
  }
})
</script>
