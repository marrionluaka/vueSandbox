<template lang="pug">
ul(data-test="search-page-categories")
  li(v-for="(category, i) in categories" :key="category.id")
    Accordion
      template(#title)
        AccordionTitle(@click="currentPanel = category.id")
          .flex.justify-between.py-2
            p.text-xl.font-bold.capitalize {{ removeUnderscore(category.name) }}
            ChevronIcon.transition-transform.ease-in-out.transform.scale-75(:class="[isOpen(category.id) ? 'rotate-0' : 'rotate-90']")

      AccordionPanel(:isOpen="isOpen(category.id)")
        ul.h-72.overflow-y-scroll.p-2(:data-test="`category-${i}`")
          li(v-for="(option, idx) in category.options" :key="option.value")
            Checkbox(
              :id="option.value"
              :isChecked="option.selected"
              :name="option.value"
              :value="option.value"
              @update:modelValue="$emit('on-selected-category', category.name, $event)"
            ) {{ option.value }}
</template>

<script lang="ts">
import { defineComponent, ref, PropType, Ref } from 'vue'

import { ChevronIcon } from '@/features/lib/components/shared'
import { ICategory } from '@/features/lib/entities/category.entity'
import Checkbox from '@/features/lib/components/Checkbox/Checkbox.vue'
import Accordion from '@/features/lib/components/Accordion/Accordion.vue'
import AccordionPanel from '@/features/lib/components/Accordion/AccordionPanel.vue'
import AccordionTitle from '@/features/lib/components/Accordion/AccordionTitle.vue'

export default defineComponent({
  components: {
    Checkbox,
    Accordion,
    ChevronIcon,
    AccordionPanel,
    AccordionTitle
  },

  props: {
    categories: {
      type: Array as PropType<ICategory[]>,
      required: true
    }
  },

  emits: ['on-selected-category'],

  setup() {
    const currentPanel: Ref<number> = ref(1)
    const isOpen = (x: number) => x == currentPanel.value
    const removeUnderscore = (x: string) => x.replace('_', ' ')

    return { currentPanel, isOpen, removeUnderscore }
  }
})
</script>
