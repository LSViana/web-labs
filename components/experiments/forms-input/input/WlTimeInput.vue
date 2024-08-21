<template>
  <WlInput
      type="time"
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
  const hours = model.value.getHours().toString().padStart(2, '0')
  const minutes = model.value.getMinutes().toString().padStart(2, '0')
  const seconds = model.value.getSeconds().toString().padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
})

const listeners = {
  update(time: string): void {
    const date = model.value.toLocaleDateString()

    model.value = new Date(`${date} ${time}`)
  }
}
</script>

