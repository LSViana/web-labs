<template>
  <input
      v-model="model"
      :type="props.type"
      class="h-10 rounded border bg-slate-200 px-3 py-2 outline-0 focus:border-slate-400 dark:bg-slate-800"
  >
</template>

<script lang="ts" setup>
type Props = {
  type?: 'text' | 'password' | 'number' | 'date' | 'time' | 'email';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const model = defineModel<string | number | Date>()
</script>
