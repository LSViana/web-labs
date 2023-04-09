<template>
  <WlButton
    :variant="props.variant"
    class="wl-confirm-button relative"
    @mousedown="listeners.mousedown"
    @mouseup="listeners.mouseup"
    @mouseleave="listeners.mouseleave"
  >
    <span class="progress-container absolute top-0 bottom-0 left-0 right-0 rounded overflow-hidden">
      <span
        class="progress block h-full bg-white opacity-20 mix-blend-plus-lighter transition-[width] duration-[1000ms]"
        :class="progressClasses"
        @transitionend="listeners.transitionend"
      />
    </span>
    <slot />
  </WlButton>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import WlButton, { WlButtonVariant } from '~/components/experiments/buttons/WlButton.vue'

type Props = {
  variant: WlButtonVariant;
};
type Events = {
  (e: 'confirm'): void;
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})
const emits = defineEmits<Events>()

const loading = ref(false)
const progressClasses = computed(() => ([
  loading.value ? 'loading' : ''
]))

const listeners = {
  mousedown (): void {
    loading.value = true
  },
  mouseup (): void {
    loading.value = false
  },
  mouseleave (): void {
    loading.value = false
  },
  transitionend (): void {
    if (loading.value) {
      methods.onConfirm()
    }
  }
}

const methods = {
  onConfirm (): void {
    emits('confirm')
  }
}
</script>

<style lang="scss" scoped>
.progress {
  width: 0;

  &.loading {
    width: 100%;
  }
}
</style>
