<template>
  <WlConfirmButton
      variant="danger"
      class="flex items-center gap-2"
      @confirm="methods.onConfirm"
      @start-confirm="methods.onStartConfirm"
      @stop-confirm="methods.onStopConfirm"
  >
    <WlTrashAnimatedIcon :progress="progress"/>
    <slot>
      <span>Hold to Delete</span>
    </slot>
  </WlConfirmButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import WlConfirmButton from '~/components/experiments/forms-input/buttons/WlConfirmButton.vue'
import WlTrashAnimatedIcon from '~/components/shared/icons/animated/WlTrashAnimatedIcon.vue'

type Events = {
  (e: 'confirm'): void;
};

const emits = defineEmits<Events>()

const progress = ref(0)

const methods = {
  onStartConfirm(): void {
    progress.value = 0.5
  },
  onStopConfirm(): void {
    progress.value = 0
  },
  onConfirm(): void {
    progress.value = 1
    emits('confirm')
  }
}
</script>
