<template>
  <WlInput
      type="date"
      :model-value="computedValue"
      :step="props.step"
      @update:model-value="listeners.update"
  />
</template>

<script setup lang="ts">
import WlInput from '~/components/experiments/forms-input/input/WlInput.vue'
import { computed } from 'vue'

type Props = {
  step?: number;
}

const props = withDefaults(defineProps<Props>(), {
  step: 1
})

const model = defineModel<Date>({ required: true })
const computedValue = computed(() => {
  const year = model.value.getFullYear()
  const month = (model.value.getMonth() + 1).toString().padStart(2, '0')
  const day = model.value.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
})

const listeners = {
  update(date: string): void {
    const time = model.value.toLocaleTimeString()

    model.value = new Date(`${date} ${time}`)
  }
}
</script>

