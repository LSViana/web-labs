<template>
  <div class="flex gap-3">
    <div
      v-for="i in props.options"
      :key="i"
      class="w-12 h-12 flex items-center justify-center rounded"
      :class="[ backgroundColors[(i - 1) % backgroundColors.length] ]"
      :data-value="i"
      @dragover="listeners.dragover"
      @drop="listeners.drop"
    >
      <div
        v-if="props.value === i"
        class="w-8 h-8 rounded"
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
const foregroundColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']

const listeners = {
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
