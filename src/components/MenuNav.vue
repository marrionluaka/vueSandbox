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
    li.flex.justify-center.items-center
      img.h-9.w-9.rounded-full.object-cover.my-2(
        alt='Profile image'
        src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.35&w=144&h=144&q=80'
      )
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { MenuItem } from './shared'
import useComponentState from '@/hooks/useComponentState'

export default defineComponent({
  components: { MenuItem },
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
          'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
      },
      {
        name: 'users',
        d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
      },
      {
        name: 'maps',
        d:
          'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
      },
      {
        name: 'book',
        d:
          'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
      },
      {
        name: 'chart',
        d: 'M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
      }
    ])
    const lowerNav = ref([
      {
        name: 'chat',
        d:
          'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
      },
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

    return {
      upperNav,
      lowerNav,
      currentLink,
      setCurrentLink
    }
  }
})
</script>
