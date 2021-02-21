<template lang="pug">
nav      
  ul.space-y-5.text-sm
    li
      p.font-semibold.text-gray-800 People
      ul.ml-4.mt-5.cursor-pointer(class="space-y-3")
        li.flex.justify-between.text-indigo-600
          p.flex-none.font-medium All users
          p.flex-none 1,025
        li.flex.justify-between
          p.flex-none.font-medium All leads
          p.flex-none 630
        li.flex.justify-between
          p.flex-none.font-medium Slipping away
          p.flex-none 4
        li.flex.justify-between
          p.flex-none.font-medium Active users
          p.flex-none 152
      button.pl-1.pt-4.font-semibold.text-gray-400.text-sm.cursor-pointer(class="focus:outline-none" @click="togglePopup") Show 10 hidden segments
      SegmentPopup(v-show="isPopupIsOpen" :segments="segments")
    li
      p.font-semibold.text-gray-800.cursor-pointer Companies
    li
      p.font-semibold.text-gray-800.cursor-pointer Conversations
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import useToggle from '@/hooks/useToggle'
import { SegmentPopup } from '@/components/intercom/shared'

export default defineComponent({
  components: { SegmentPopup },
  setup() {
    const segments = reactive([
      {
        name: 'Slipping Away',
        status: 'Default Segment',
        isVisible: true
      },
      {
        name: 'Active users',
        status: 'Created by William 2 years ago',
        isVisible: true
      },
      {
        name: 'New',
        status: 'Default Segment',
        isVisible: false
      },
      {
        name: 'Active',
        status: 'Default Segment',
        isVisible: false
      },
      {
        name: 'Callback',
        status: 'Created by William 2 years ago',
        isVisible: false
      }
    ])
    const [isPopupIsOpen, togglePopup] = useToggle()
    return {
      segments,
      isPopupIsOpen,
      togglePopup
    }
  }
})
</script>
