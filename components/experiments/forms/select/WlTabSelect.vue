<template>
  <div class="border flex p-2 bg-slate-200 dark:bg-slate-800 rounded relative">
    <button
      v-for="(option, index) in props.options"
      :key="option"
      class="px-3 py-2 z-10"
      @click="listeners.clickButton(index)"
    >
      {{ option }}
    </button>
    <div ref="selectedOverlay" class="absolute rounded bg-slate-300 dark:bg-slate-600 opacity-0 transition-[left,width,opacity]" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue'

type Props = {
  options: string[];
  value: number;
};
type Events = {
  (e: 'update:value', value: number): void;
};

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const selectedOverlay = ref<HTMLElement>()

const listeners = {
  clickButton (index: number): void {
    emits('update:value', index)
  }
}

const methods = {
  updateSelectedOverlay (): void {
    const overlayElement = selectedOverlay.value
    if (!overlayElement) {
      return
    }

    const selectedButton = overlayElement?.parentElement?.children[props.value] as HTMLElement | undefined

    if (!selectedButton) {
      return
    }

    overlayElement.style.left = `${selectedButton.offsetLeft}px`
    overlayElement.style.top = `${selectedButton.offsetTop}px`
    overlayElement.style.width = `${selectedButton.offsetWidth}px`
    overlayElement.style.height = `${selectedButton.offsetHeight}px`

    overlayElement.classList.remove('opacity-0')
    overlayElement.classList.add('opacity-100')
  }
}

onUpdated(() => methods.updateSelectedOverlay())
onMounted(() => methods.updateSelectedOverlay())
</script>

<style lang="scss" scoped>
</style>
