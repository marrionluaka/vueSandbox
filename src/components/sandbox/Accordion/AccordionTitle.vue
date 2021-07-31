<template lang="pug">
button.accordion-title(data-test="accordion-title")
  slot
</template>

<style lang="stylus" scoped>
.accordion-title
  @apply w-full appearance-none bg-transparent
</style>
