<template>
  <div class="flex h-2 w-32 bg-violet-900 rounded-full overflow-hidden">
    <span class="inline-block h-full bg-violet-500 transition-[width]" :style="trackStyles" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  value: number;
  max: number;
};

const props = defineProps<Props>()

const trackStyles = computed<Partial<CSSStyleDeclaration>>(() => ({
  width: `${props.value / props.max * 100}%`
}))
</script>

<style lang="scss" scoped>
</style>
