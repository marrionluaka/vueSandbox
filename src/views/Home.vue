<template lang="pug">
main.container.leading-normal.my-12.mx-auto.px-4
  div.mb-24
    h1.mb-8.text-5xl Playground project
    p.mb-8.text-xl
      | A playground project using: Vue3, Tailwind, Typescript, Miragejs and much more.
  
  .flex.flex-wrap.my-8.-mx-1
    .my-1.px-1(v-for="img in imgs" class="w-1/2 md:w-1/3 lg:w-1/4")
      img.block.h-auto.w-full(:src="img.src" :alt="img.alt")
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Home",

  props: {
    msg: String
  },

  setup(props) {
    const imgs = reactive(([...Array(12)]).map(_ => ({ src: 'https://via.placeholder.com/640x640', alt: 'Placeholder' })))

    return { imgs }
  }
})
</script>
