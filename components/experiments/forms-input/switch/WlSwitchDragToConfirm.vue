<template>
  <div class="relative w-48 rounded-full border bg-slate-100 px-7 py-1 dark:bg-slate-800">
    <div
      class="flex size-12 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-slate-300
      transition-[border-color,background-color] hover:border dark:bg-slate-600"
      :class="handleClasses"
      :style="handleStyles"
      @pointerup="listeners.pointerup"
      @pointerdown="listeners.pointerdown"
    >
      <span class="pointer-events-none flex">
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

    document.body.removeEventListener('pointermove', this.pointermove)
    document.body.removeEventListener('pointerup', this.pointerup)
  },
  pointerdown (): void {
    dragging.value = true

    document.body.addEventListener('pointermove', this.pointermove)
    document.body.addEventListener('pointerup', this.pointerup)
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
