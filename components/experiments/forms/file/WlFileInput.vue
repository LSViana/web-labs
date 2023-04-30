<template>
  <label
    class="inline-flex cursor-pointer rounded overflow-hidden transition-colors border"
    :class="labelClasses"
    @dragenter="listeners.dragenter"
    @dragleave="listeners.dragleave"
    @dragover="listeners.dragover"
    @drop="listeners.drop"
  >
    <span
      class="p-3 mr-[1px] pointer-events-none transition-colors"
      :class="chooseFileClasses"
    >
      Choose File
    </span>
    <span class="py-3 pl-3 pr-12 bg-slate-200 dark:bg-slate-800 pointer-events-none">
      <span class="opacity-70">
        <template v-if="droppedFiles">
          Dropped {{ droppedFiles.length }} {{ droppedFiles.length > 1 ? 'files' : 'file' }}
        </template>
        <template v-else>
          {{ dragging ? 'Drop file here' : 'Select a file...' }}
        </template>
      </span>
    </span>
    <input type="file" class="opacity-0 absolute pointer-events-none">
  </label>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

type Props = {};
type Events = {};

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const dragging = ref(false)
const droppedFiles = ref<FileList>()

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

    const label = event.target as HTMLLabelElement
    const input = label.querySelector('input')!
    const files = event.dataTransfer?.files

    if (files) {
      input.files = files
      droppedFiles.value = files
    }
  }
}

const methods = {}
</script>

<style lang="scss" scoped>
</style>
