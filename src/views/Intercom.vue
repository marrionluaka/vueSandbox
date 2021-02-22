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
        .flex.items-center.justify-between.m-3.mx-5
          button.flex-none(class="focus:outline-none") email (1)
          button.flex-none(class="focus:outline-none") Newest
      InboxCard(v-for="data in messageData" :key="data.id" :messageData="data" @onClick="setActive")

    .border-r(class="w-2/4")
      p Two

    div(class="w-1/4")
      p Three
</template>

<script>
import { defineComponent, reactive } from 'vue'

import { InboxCard } from '@/components/intercom/shared'
import MenuNav from '@/components/intercom/MenuNav'
import SubMenuNav from '@/components/intercom/SubMenuNav'

export default defineComponent({
  components: { MenuNav, SubMenuNav, InboxCard },
  setup() {
    const messageData = reactive([
      {
        id: 1,
        isActive: false,
        name: 'Richard Watson',
        profileImagePath:
          'https://images.unsplash.com/photo-1513152697235-fe74c283646a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.35&w=144&h=144&q=80',
        location: 'Stantam',
        timeStamp: '16m',
        excerpt: "I'm looking for a new project management tool. Do you guys do demos? aldklskdlakd"
      },
      {
        id: 2,
        isActive: true,
        name: 'Steve Dunn',
        profileImagePath:
          'https://images.unsplash.com/photo-1571512599285-9ac4fdf3dba9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.35&w=144&h=144&q=80',
        location: 'Sydney',
        timeStamp: '35m',
        excerpt: "I'm looking for a new project management tool. Do you guys do demos? aldklskdlakd"
      }
    ])
    const setActive = id => {
      messageData.forEach(x => (x.isActive = false))
      const user = messageData.find(x => x.id === id)
      if (user) {
        user.isActive = true
      }
    }
    return { messageData, setActive }
  }
})
</script>
