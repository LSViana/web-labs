<template>
  <WlIcon :size="props.size">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path
        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zM48 453.5v-395c0-4.6 5.1-7.5 9.1-5.2l334.2 197.5c3.9 2.3 3.9 8 0 10.3L57.1 458.7c-4 2.3-9.1-.6-9.1-5.2z"
      />
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
