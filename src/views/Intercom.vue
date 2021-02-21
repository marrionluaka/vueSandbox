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
</template>

<script>
import { defineComponent } from 'vue'

import MenuNav from '@/components/intercom/MenuNav'
import SubMenuNav from '@/components/intercom/SubMenuNav'

export default defineComponent({
  components: { MenuNav, SubMenuNav }
})
</script>
