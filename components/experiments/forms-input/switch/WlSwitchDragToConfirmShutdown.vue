<template>
  <WlSwitchDragToConfirm @confirm="methods.onConfirm">
    <WlPowerOffIcon class="text-slate-600 dark:text-slate-300" />
  </WlSwitchDragToConfirm>
</template>

<script lang="ts" setup>
import WlSwitchDragToConfirm from '~/components/experiments/forms/switch/WlSwitchDragToConfirm.vue'
import WlPowerOffIcon from '~/components/shared/icons/static/WlPowerOffIcon.vue'

type Events = {
  (e: 'confirm'): void;
};

const emits = defineEmits<Events>()

const methods = {
  onConfirm (): void {
    emits('confirm')
  }
}
</script>
