<template lang="pug">
.flex.flex-col.absolute.bg-white.bottom-1.border-l.shadow-xl.z-10(style="width: 250px;transform: translateX(27%);")
  //- user section
  .user.flex.border-b.px-7.py-4
    ProfileImage
    .leading-none.ml-4.mt-2
      p.font-semibold.text-sm William Defoe
      span.block.text-gray-500.text-xs Active

  //- mode section
  .mode.flex.border-b.px-7.py-6.justify-between.items-center
    p.text-sm.text-gray-500 Away mode
    .flex.bg-gray-500.items-center.rounded-sm.text-white.cursor-pointer
      span.bg-white.m-1.rounded-sm(class="p-2.5 m-0.5")
      span.flex-none.px-1.text-sm(class="pr-1.5") Off

  //- menu section
  .apps.border-b.px-7.py-4
    .leading-none.cursor-pointer
      .flex.justify-between.items-center
        p.font-semibold.text-sm Example App
        .transform.scale-75
          svg.w-6.h-6(
            fill='none'
            stroke='currentColor'
            viewbox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          )
            path(
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M9 5l7 7-7 7'
            )
      p.text-gray-500.text-sm Create or switch apps

    ul.space-y-3(class="mt-3")
      li.flex.text-sm.font-semibold.cursor-pointer(class="-ml-1.5")
        .transform.scale-75.pr-1
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4')
        p Integrations
      li.flex.text-sm.font-semibold.cursor-pointer(class="-ml-1.5")
        .transform.scale-75.pr-1
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z')
        p Settings
      li.flex.text-sm.font-semibold.cursor-pointer(class="-ml-1.5")
        .transform.scale-75.pr-1
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z')
        p Your account
      li.flex.text-sm.font-semibold.cursor-pointer(class="-ml-1.5")
        .transform.scale-75.pr-1
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z')
        p Billing

  //- help section
  .help.border-b.px-7.py-4.space-y-3
    p.text-sm.font-semibold.cursor-pointer Intercom Help Center
    p.text-sm.font-semibold.cursor-pointer Status Page
    p.text-sm.font-semibold.cursor-pointer Terms &amp; policies

  //- log out
  .auth.px-7.py-4
    p.text-sm.font-semibold.cursor-pointer Log out
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ProfileImage } from './shared'

export default defineComponent({
  components: { ProfileImage }
})
</script>
