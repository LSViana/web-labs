<template>
  <div class="flex flex-col gap-3">
    <p>Value: <code>{{ source.value }}</code></p>
    <div class="h-2 w-64 overflow-hidden rounded-full bg-slate-500">
      <div class="h-full bg-slate-400" :style="{ width: `${source.value}%` }" />
    </div>
    <a href="#" class="underline" @click.prevent="listeners.onRestart">Restart</a>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, reactive } from 'vue'

const source = reactive({ value: 0 })

const methods = {
  animate(): void {
    gsap.set(source, { value: 0 })
    gsap.to(
      source,
      {
        value: 100,
        duration: 2
      })
  }
}

const listeners = {
  onRestart(): void {
    methods.animate()
  }
}

onMounted(methods.animate)
</script>
