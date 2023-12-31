<template>
  <WlButton
    :variant="props.variant"
    class="wl-confirm-button relative"
    @mousedown="listeners.mousedown"
    @mouseup="listeners.mouseup"
    @mouseleave="listeners.mouseleave"
    @touchstart="listeners.touchstart"
    @touchend="listeners.touchend"
    @keydown="listeners.keydown"
    @keyup="listeners.keyup"
  >
    <span class="progress-container absolute inset-0 overflow-hidden rounded-[inherit]">
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

import WlButton from '~/components/experiments/buttons/WlButton.vue'
import type { WlButtonVariant } from '~/components/experiments/forms-input/buttons/WlButton.vue'

import { KeyboardCode } from '~/utils/types/ui/keyboardEvent'

type Props = {
  variant: WlButtonVariant;
};
type Events = {
  (e: 'confirm'): void;
  (e: 'start-confirm'): void;
  (e: 'stop-confirm'): void;
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
    methods.onStartConfirm()
  },
  mouseup (): void {
    methods.onStopConfirm()
  },
  mouseleave (): void {
    methods.onStopConfirm()
  },
  touchstart (): void {
    methods.onStartConfirm()
  },
  touchend (): void {
    methods.onStopConfirm()
  },
  keydown (event: KeyboardEvent): void {
    if (event.code === KeyboardCode.space) {
      methods.onStartConfirm()
    }
  },
  keyup (event: KeyboardEvent): void {
    if (event.code === KeyboardCode.space) {
      methods.onStopConfirm()
    }
  },
  transitionend (): void {
    if (loading.value) {
      methods.onConfirm()
    }
  }
}

const methods = {
  onStartConfirm (): void {
    loading.value = true
    emits('start-confirm')
  },
  onStopConfirm (): void {
    loading.value = false
    emits('stop-confirm')
  },
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
