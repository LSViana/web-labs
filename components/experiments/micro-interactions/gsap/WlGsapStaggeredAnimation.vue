<template>
  <div ref="root" class="flex flex-col gap-2">
    <div class="h-6 w-6 rounded border border-amber-400 bg-amber-500" />
    <div class="h-6 w-6 rounded border border-purple-400 bg-purple-500" />
    <div class="h-6 w-6 rounded border border-green-400 bg-green-500" />
    <div class="h-6 w-6 rounded border border-blue-400 bg-blue-500" />
    <div class="h-6 w-6 rounded border border-fuchsia-400 bg-fuchsia-500" />
    <div class="h-6 w-6 rounded border border-orange-400 bg-orange-500" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const root = ref<HTMLElement>()

onMounted(async () => {
  const boxes = root.value?.querySelectorAll('div')

  await gsap.to(boxes!, {
    duration: 1,
    repeatRefresh: true,
    x: () => root.value!.clientWidth,
    xPercent: -100,
    ease: 'sine.inOut',
    stagger: {
      each: 1,
      repeat: -1,
      yoyo: true
    }
  })
})
</script>
