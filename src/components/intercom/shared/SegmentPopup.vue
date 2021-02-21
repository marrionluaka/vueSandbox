<template lang="pug">
.overflow-y-scroll.h-32.absolute.top-40.left-56.bg-white.border-l.shadow-xl(style="width:300px;min-height:330px;")
  //- Visible segments
  div
    .flex.justify-between.px-3.py-1.bg-gray-100
      p.font-semibold.text-gray-800 Visible to you across Intercom
      .transform.scale-75.pr-1.cursor-pointer
        svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
          path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z')
    ul.mb-1
      li.p-2.cursor-pointer(v-for="seg in segments.filter(x => x.isVisible)")
        .flex.items-start
          .transform.scale-75.pr-2
            svg.w-6.h-6(class="-mt-0.5" fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
              path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z')
              path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z')
          div
            p.flex-none.font-semibold.text-sm {{ seg.name }}
            p.text-gray-500.text-xs {{ seg.status }}
  //- Hidden segments
  div
    .px-3.py-1.bg-gray-100
      p.font-semibold.text-gray-800 Hidden to you across Intercom
    ul.mb-1
      li.p-2.cursor-pointer(v-for="seg in segments.filter(x => !x.isVisible)")
        .flex.items-start
          .transform.scale-75.pr-2
            svg.w-6.h-6(class="-mt-0.5" fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
              path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21')
          div
            p.flex-none.font-semibold.text-sm {{ seg.name }}
            p.text-gray-500.text-xs {{ seg.status }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    segments: {
      type: Array,
      required: true
    }
  }
})
</script>
