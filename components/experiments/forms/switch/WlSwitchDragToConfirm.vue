<template>
  <div class="w-48 relative border rounded-full px-7 py-1 bg-slate-100 dark:bg-slate-800">
    <div
      class="h-12 w-12 rounded-full bg-slate-300 dark:bg-slate-600 touch-none flex items-center justify-center -translate-x-1/2 transition-[border-color,background-color]"
      :class="handleClasses"
      :style="handleStyles"
      @pointerup="listeners.pointerup"
      @pointerdown="listeners.pointerdown"
      @pointermove="listeners.pointermove"
      @pointerenter="listeners.pointerenter"
    >
      <span class="flex pointer-events-none">
        <slot />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

type Events = {
  (e: 'confirm'): void;
};

const emits = defineEmits<Events>()

const confirmed = ref(false)
const dragging = ref(false)
const offset = ref(0)

const handleClasses = computed(() => ({
  'border border-gray-300': dragging.value
}))

const handleStyles = computed(() => ({
  marginLeft: `${offset.value}px`
}))

const maxOffset = 134 // 192-56-2 => [width of the track]-[padding of the track]-[border of the track]

const listeners = {
  pointerup (): void {
    dragging.value = false
    document.body.style.cursor = ''
  },
  pointerdown (): void {
    dragging.value = true
    document.body.style.cursor = 'move'
  },
  pointerenter (event: PointerEvent): void {
    if (event.buttons ^ 1) {
      dragging.value = false
    }
  },
  pointermove (event: PointerEvent): void {
    if (!dragging.value) {
      return
    }

    event.stopPropagation()

    offset.value += event.movementX

    if (offset.value < 0) {
      offset.value = 0
    } else if (offset.value > maxOffset) {
      methods.onConfirm()

      offset.value = maxOffset
    }
  }
}

const methods = {
  onConfirm (): void {
    if (confirmed.value) {
      return
    }

    confirmed.value = true
    emits('confirm')
  }
}
</script>
