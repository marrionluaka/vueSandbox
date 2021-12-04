<template lang="pug">
.flex.h-full.bg-gray-100.-pt-4
  //- menu
  MenuNav
  //- sidebar
  .flex.flex-col.flex-none.w-64.space-y-4.p-4.relative.bg-gray-100
    //- TODO: pass in sub menu prop
    SubMenuNav
  //- main content
  main.flex.flex-auto.bg-white.rounded-tl-xl.border-l.shadow-xl
    .border-r(class="w-1/4")
      .border-b
        .flex.items-center.m-5
          button(class="focus:outline-none")
            svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
              path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h8m-8 6h16')
          h2.ml-4.font-medium.text-lg.tracking-wide VIP Sales
      .border-b
        .flex.items-center.justify-between.m-3.mx-4
          button.flex.pl-2.flex-none.items-center(class="focus:outline-none")
            .transform.scale-75.mr-1
              svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
                path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20')
            span.ml-0.text-sm.font-semibold (243)
            .ml-1.transform.scale-50
              svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
                path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7')
          button.flex.flex-none.items-center(class="focus:outline-none")
            span.ml-0.text-sm.font-semibold Newest
            .ml-1.transform.scale-50
              svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
                path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7')
      InboxCard(v-for="data in messages" :key="data.id" :messageData="data" @onClick="setActive")

    .border-r(class="w-2/4")
      p Two

    div(class="w-1/4")
      p Three
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from 'vue'

import { IMessageData } from '@/global-types'
import MenuNav from '@/features/intercom/components/MenuNav.vue'
import { InboxCard } from '@/features/intercom/components/shared'
import SubMenuNav from '@/features/intercom/components/SubMenuNav.vue'

export default defineComponent({
  components: { MenuNav, SubMenuNav, InboxCard },
  setup() {
    const messages: Ref<IMessageData[]> = ref([])

    onMounted(async () => {
      const response = await fetch('/intercom/messages')
      const data = await response.json()

      messages.value = data
    })

    const setActive = (id: number) => {
      messages.value.forEach(x => (x.isActive = false))
      const user = messages.value.find(x => x.id === id)

      if (user) {
        user.isActive = true
      }
    }

    return { messages, setActive }
  }
})
</script>
