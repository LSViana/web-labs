<template>
  <select
    v-model="model"
    class="h-10 rounded border bg-slate-200 px-3 py-2 outline-0 focus:border-slate-400 dark:bg-slate-800"
  >
    <slot />
  </select>
</template>

<script lang="ts" setup>
const model = defineModel<string>()
</script>
