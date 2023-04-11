<template>
  <div class="inline-flex gap-0.5">
    <div
      v-for="i in props.max"
      :key="i"
      class="w-1.5 h-6 rounded-full"
      :class="[ i <= value ? 'bg-green-500' : 'bg-green-900' ]"
    />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  value: number;
  max: number;
};

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
</style>
