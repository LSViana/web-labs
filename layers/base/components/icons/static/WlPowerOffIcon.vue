<template>
  <WlIcon :size="props.size">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M280 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V264c0 13.3 10.7 24 24 24s24-10.7 24-24V24zM134.2 107.3c10.7-7.9 12.9-22.9 5.1-33.6s-22.9-12.9-33.6-5.1C46.5 112.3 8 182.7 8 262C8 394.6 115.5 502 248 502s240-107.5 240-240c0-79.3-38.5-149.7-97.8-193.3c-10.7-7.9-25.7-5.6-33.6 5.1s-5.6 25.7 5.1 33.6c47.5 35 78.2 91.2 78.2 154.7c0 106-86 192-192 192S56 368 56 262c0-63.4 30.7-119.7 78.2-154.7z" />
    </svg>
  </WlIcon>
</template>

<script lang="ts" setup>
import type { WlIconSize } from '~~/layers/base/components/icons/WlIcon.vue';
import WlIcon from '~~/layers/base/components/icons/WlIcon.vue';

type Props = {
  size?: WlIconSize
};

const props = defineProps<Props>();
</script>
