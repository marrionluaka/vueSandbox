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
      button.pl-1.pt-4.font-semibold.text-gray-400.text-sm.cursor-pointer(class="hover:text-gray-300 focus:outline-none" @click="togglePopup") Show 10 hidden segments
      SegmentPopup(v-show="isPopupIsOpen" :segments="segments")
    li
      p.font-semibold.text-gray-800.cursor-pointer Companies
    li
      p.font-semibold.text-gray-800.cursor-pointer Conversations
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import useToggle from '../hooks/useToggle'
import { ISegment } from '@/global-types'
import { SegmentPopup } from './shared'

export default defineComponent({
  components: { SegmentPopup },

  props: {
    segments: {
      type: Array as PropType<ISegment[]>,
      required: true
    }
  },

  setup() {
    const [isPopupIsOpen, togglePopup] = useToggle()

    return {
      isPopupIsOpen,
      togglePopup
    }
  }
})
</script>
