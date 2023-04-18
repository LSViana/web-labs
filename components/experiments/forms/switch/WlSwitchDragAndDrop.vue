<template>
  <div class="flex gap-3">
    <div
      v-for="i in props.options"
      :key="i"
      class="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer border-2 transition-colors"
      :class="[
        backgroundColors[(i - 1) % backgroundColors.length],
        props.value === i ? borderColors[(i - 1) % borderColors.length] : 'border-transparent hover:border-white'
      ]"
      :data-value="i"
      @dragover="listeners.dragover"
      @drop="listeners.drop"
      @click="listeners.click"
    >
      <div
        v-if="props.value === i"
        class="w-6 h-6 rounded-full"
        :class="[ foregroundColors[(i - 1) % foregroundColors.length] ]"
        draggable="true"
        @dragstart="listeners.dragstart"
      />
      <span v-else class="pointer-events-none">
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
const borderColors = ['border-green-500', 'border-blue-500', 'border-yellow-500', 'border-red-500', 'border-purple-500']
const foregroundColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']

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
