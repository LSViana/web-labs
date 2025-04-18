<template>
  <ul class="flex h-6">
    <li
      v-for="(digit, index) in digits"
      :key="index"
      class="relative flex w-2.5 justify-center font-mono"
    >
      <TransitionGroup name="number-display" appear>
        <span :key="digit" class="h-full">{{ digit }}</span>
      </transitiongroup>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  value: number
}

const props = defineProps<Props>()
const digits = computed(() => props.value.toString().split(''))
</script>

<style lang="scss" scoped>
.number-display {
  &-enter-active, &-leave-active {
    @apply transition-[transform,opacity];
    @apply duration-300;

    position: absolute;
  }

  &-enter-from {
    transform: translateY(1rem);
    opacity: 0;
  }

  &-leave-to {
    transform: translateY(-1rem);
    opacity: 0;
  }

  &-enter-to, &-leave-from {
    transform: translateY(0);
  }
}
</style>
