<template>
  <div class="h-48">
    <div ref="box1" class="h-6 w-6 rounded border border-amber-400 bg-amber-500" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const box1 = ref<HTMLElement>()

onMounted(async () => {
  await gsap.to(box1.value!, { duration: 2, x: 100 })
  await gsap.to(box1.value!, { duration: 2, y: 100 })
  await gsap.to(box1.value!, { duration: 2, rotate: 27 })
  await gsap.to(box1.value!, { duration: 2, x: 0 })
  await gsap.to(box1.value!, { duration: 2, x: 0, y: 0, rotate: 0 })
})
</script>
