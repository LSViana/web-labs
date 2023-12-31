<template>
  <div class="flex gap-3">
    <div
      v-for="i in props.options"
      :key="i"
      class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 transition-colors"
      :class="[
        backgroundColors[(i - 1) % backgroundColors.length],
        props.value === i ? borderColors[(i - 1) % borderColors.length] : 'border-transparent hover:border-white/25'
      ]"
      :data-value="i"
      @dragover="listeners.dragover"
      @drop="listeners.drop"
      @click="listeners.click"
    >
      <div
        v-if="props.value === i"
        class="flex h-9 w-9 items-center justify-center rounded-full"
        :class="[ foregroundColors[(i - 1) % foregroundColors.length] ]"
        draggable="true"
        :data-value="i"
        @dragstart="listeners.dragstart"
      >
        {{ i }}
      </div>
      <span v-else class="pointer-events-none text-white">
        {{ i }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  options: number;
  value: number;
};
type Events = {
  (e: 'update:value', event: number): void;
};

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const backgroundColors = ['bg-green-900', 'bg-blue-900', 'bg-yellow-900', 'bg-red-900', 'bg-purple-900']
const borderColors = ['border-green-400', 'border-blue-400', 'border-yellow-400', 'border-red-400', 'border-purple-400']
const foregroundColors = ['bg-green-400 text-green-900', 'bg-blue-400 text-blue-900', 'bg-yellow-400 text-yellow-900', 'bg-red-400 text-red-900', 'bg-purple-400 text-purple-900']

const listeners = {
  click (event: MouseEvent): void {
    const newValue = Number.parseInt((event.target as HTMLElement).dataset.value ?? '0')
    methods.onInput(newValue)
  },
  dragstart (event: DragEvent): void {
    if (!event.dataTransfer) {
      return
    }

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', props.value.toString())
    event.dataTransfer.setDragImage(document.createElement('div'), 0, 0)
  },
  dragover (event: DragEvent): void {
    event.preventDefault()
  },
  drop (event: DragEvent): void {
    if (!event.dataTransfer) {
      return
    }

    const newValueRaw = (event.target as HTMLElement).dataset.value
    if (!newValueRaw) {
      throw new Error('The target element does not have a data-value attribute.')
    }

    methods.onInput(Number.parseInt(newValueRaw))
  }
}

const methods = {
  onInput (value: number): void {
    emits('update:value', value)
  }
}
</script>
