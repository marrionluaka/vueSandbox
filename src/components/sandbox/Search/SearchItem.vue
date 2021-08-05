<template lang="pug">
li(data-test="search-item")
  router-link(data-test="search-link")
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
