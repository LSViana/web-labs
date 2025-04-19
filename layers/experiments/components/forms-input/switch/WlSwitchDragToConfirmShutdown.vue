<template>
  <WlSwitchDragToConfirm @confirm="methods.onConfirm">
    <WlPowerOffIcon class="text-slate-600 dark:text-slate-300" />
  </WlSwitchDragToConfirm>
</template>

<script lang="ts" setup>
import WlPowerOffIcon from '~~/layers/base/components/icons/static/WlPowerOffIcon.vue';
import WlSwitchDragToConfirm from '~~/layers/experiments/components/forms-input/switch/WlSwitchDragToConfirm.vue';

type Events = {
  (e: 'confirm'): void
};

const emits = defineEmits<Events>();

const methods = {
  onConfirm(): void {
    emits('confirm');
  },
};
</script>
