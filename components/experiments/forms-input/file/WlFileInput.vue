<template>
  <label
    class="inline-flex cursor-pointer overflow-hidden rounded border transition-colors"
    :class="labelClasses"
    @dragenter="listeners.dragenter"
    @dragleave="listeners.dragleave"
    @dragover="listeners.dragover"
    @drop="listeners.drop"
  >
    <span
      class="pointer-events-none mr-[1px] p-3 transition-colors"
      :class="chooseFileClasses"
    >
      Choose File
    </span>
    <span class="pointer-events-none bg-slate-200 py-3 pl-3 pr-12 dark:bg-slate-800">
      <span class="opacity-70">
        <template v-if="props.value">
          Dropped {{ props.value.length }} {{ props.value.length > 1 ? 'files' : 'file' }}
        </template>
        <template v-else>
          {{ dragging ? 'Drop file here' : 'Select a file...' }}
        </template>
      </span>
    </span>
    <input
      type="file"
      :multiple="props.multiple"
      :accept="props.accept"
      class="pointer-events-none absolute opacity-0"
      @input="methods.onInputFile"
    >
  </label>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

type Props = {
  accept?: string;
  multiple?: boolean;
  value?: FileList;
};
type Events = {
  (e: 'update:value', value: FileList): void;
};

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const dragging = ref(false)

const labelClasses = computed(() => ([
  dragging.value
    ? 'dark:border-blue-500 dark:bg-blue-500 text-blue-100' +
      'border-blue-300 bg-blue-300 hover:border-blue-400 hover:bg-blue-400'
    : 'dark:border-slate-500 dark:bg-slate-500 ' +
      'border-slate-300 bg-slate-300 hover:border-slate-400 hover:bg-slate-400'
]))
const chooseFileClasses = computed(() => ([
  dragging.value
    ? 'bg-blue-100 dark:bg-blue-500'
    : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500'
]))

const listeners = {
  dragenter (event: DragEvent): void {
    event.preventDefault()
    dragging.value = true
  },
  dragleave (): void {
    dragging.value = false
  },
  dragover (event: DragEvent): void {
    event.preventDefault()
  },
  drop (event: DragEvent): void {
    event.preventDefault()
    dragging.value = false

    const files = event.dataTransfer?.files

    if (files) {
      methods.onInput(files)
    }
  }
}

const methods = {
  onInputFile (event: Event): void {
    const input = event.target as HTMLInputElement

    if (input.files) {
      methods.onInput(input.files)
    }
  },
  onInput (value: FileList): void {
    emits('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
</style>
