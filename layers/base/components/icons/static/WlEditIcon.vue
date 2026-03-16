<template>
  <WlIcon :size="props.size">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
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
