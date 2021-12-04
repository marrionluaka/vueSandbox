<template lang="pug">
nav.flex.flex-col.justify-between.flex-none.w-16.bg-gray-200
  ul.space-y-4.cursor-pointer.flex-none
    MenuItem(
      v-for="item in upperNav"
      :to="item.name"
      :isActive="currentLink === item.name"
      @onNavigate="setCurrentLink"
    )
      svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
        path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' :d="item.d")

  ul.cursor-pointer.flex-none
    MenuItem(
      v-for="item in lowerNav"
      :to="item.name"
      :isActive="currentLink === item.name"
      @onNavigate="setCurrentLink"
    )
      svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
        path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' :d="item.d")
    li.flex.justify-center.items-center(@click="toggleUserPopup")
      ProfileImage(className="bg-green-400 border-gray-200")

  UserPopup(v-show="isUserPopupIsOpen")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { MenuItem, ProfileImage } from './shared'
import UserPopup from './UserPopup.vue'
import useToggle from '../hooks/useToggle'
import useComponentState from '../hooks/useComponentState'

export default defineComponent({
  components: { MenuItem, UserPopup, ProfileImage },
  setup() {
    const upperNav = ref([
      {
        name: 'inbox',
        d:
          'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
      },
      {
        name: 'deploy',
        d:
          'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
      },
      {
        name: 'users',
        d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
      },
      {
        name: 'charts',
        d: 'M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
      }
    ])
    const lowerNav = ref([
      {
        name: 'grid',
        d:
          'M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
      },
      {
        name: 'bell',
        d:
          'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
      }
    ])
    const [currentLink, setCurrentLink] = useComponentState('inbox')
    const [isUserPopupIsOpen, toggleUserPopup] = useToggle()

    return {
      upperNav,
      lowerNav,
      currentLink,
      setCurrentLink,
      toggleUserPopup,
      isUserPopupIsOpen
    }
  }
})
</script>
