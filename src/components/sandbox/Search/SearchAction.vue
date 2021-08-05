<template lang="pug">
button.appearance-none(data-test="search-action" @click="$emit('click')")
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['click']
})
</script>
