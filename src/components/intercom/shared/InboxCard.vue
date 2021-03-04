<template lang="pug">
a.block.border-b(href="#" @click.prevent="$emit('onClick', messageData.id)")
  .border-l-2.p-3.px-4.space-y-4(:class="['hover:bg-gray-100', currentClass]")
    .flex.flex-row.items-center.space-x-2
      ProfileImage(:src="messageData.profileImagePath")
      .flex-grow.leading-normal.ml-3
        p.font-semibold.text-blue-500 {{ messageData.name }}
        span.block.text-sm {{ messageData.location }}
      p.text-sm {{ messageData.timeStamp }}
    p.pt-2.truncate {{ messageData.excerpt }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import ProfileImage from './ProfileImage.vue'
import { IMessageData } from '@/global-types'

export default defineComponent({
  components: { ProfileImage },

  props: {
    messageData: {
      type: Object as () => IMessageData,
      required: true
    }
  },

  setup(props) {
    const currentClass = computed(() => (props.messageData.isActive ? 'border-blue-500 bg-blue-100' : 'border-transparent'))
    return { currentClass }
  }
})
</script>
