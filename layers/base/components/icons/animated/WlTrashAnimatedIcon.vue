<template>
  <WlIcon :size="props.size" class="wl-trash-animated-icon">
    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path class="wl-lid" :style="lidStyles" d="M177.1 48H270.8C273.5 48 276 49.3 277.5 51.6L296.5 80H151.5L170.5 51.6C172 49.4 174.5 48 177.2 48H177.1ZM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1C158.4 0 140.9 9.4 130.5 24.9L93.8 80H80.1H32H24C10.7 80 0 90.7 0 104C0 117.3 10.7 128 24 128H35.6H364.3H412.4H424C437.3 128 448 117.3 448 104C448 90.7 437.3 80 424 80H416H367.9H354.2ZM364.3 128H35.6H83.7H364.3Z" />
      <path d="M60 452.7L36 128H84.1L107.8 449.2C108.5 457.5 115.4 464 123.8 464H324.9C333.3 464 340.3 457.6 340.9 449.2L364.7 128H412.8L388.8 452.7C386.3 486.1 358.5 512 325 512H123.8C90.3 512 62.5 486.1 60 452.7Z" />
    </svg>
  </WlIcon>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { WlIconSize } from '~~/layers/base/components/icons/WlIcon.vue';
import WlIcon from '~~/layers/base/components/icons/WlIcon.vue';

type Props = {
  progress?: number
  size?: WlIconSize
};

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  size: 'md',
});

const lidStyles = computed(() => `--tw-rotate: ${props.progress * -24}deg`);
</script>

<style lang="scss" scoped>
.wl-trash-animated-icon {
  :deep(.wl-lid) {
    @apply transition-transform;
    @apply transform;
    @apply origin-[0%_30%];
  }
}
</style>
