<template>
  <div class="flex items-end gap-3">
    <div class="inline-flex flex-col">
      <span class="text-muted dark:text-muted-dark">Start</span>
      <WlTimeInput v-model="startDate"/>
    </div>
    <div class="inline-flex flex-col">
      <span class="text-muted dark:text-muted-dark">End</span>
      <WlTimeInput v-model="endDate"/>
    </div>
    <div class="inline-flex flex-col">
      <span class="text-muted dark:text-muted-dark">Type</span>
      <WlSelect v-model="type">
        <option v-for="item in types" :key="item" :value="item">{{ PomodoroIntervalTypeLabels[item] }}</option>
      </WlSelect>
    </div>
    <WlButton variant="primary" @click="listeners.save">Save</WlButton>
    <WlButton variant="secondary" @click="listeners.close">Close</WlButton>
  </div>
</template>

<script setup lang="ts">
import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import { ref, watch } from 'vue'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlTimeInput from '~/components/experiments/forms-input/input/WlTimeInput.vue'
import { PomodoroIntervalType, PomodoroIntervalTypeLabels } from '~/components/applications/pomodoro/types/pomodoroType'
import WlSelect from '~/components/experiments/forms-input/input/WlSelect.vue'

type Emits = {
  (e: 'update:record', value: PomodoroRecord): void;
  (e: 'close'): void;
}

const emits = defineEmits<Emits>()

const record = defineModel<PomodoroRecord>('record', { required: true })

const startDate = ref<Date>(record.value.startDate)
const endDate = ref<Date>(record.value.endDate)
const type = ref<PomodoroIntervalType>(record.value.type)

const types = Object.values(PomodoroIntervalType)

watch(
    record,
    () => {
      startDate.value = record.value.startDate
      endDate.value = record.value.endDate
      type.value = record.value.type
    },
    { immediate: true }
)

const listeners = {
  save: (): void => {
    const newRecord = new PomodoroRecord(startDate.value, endDate.value, type.value)

    emits('update:record', newRecord)
  },
  close: (): void => {
    emits('close')
  }
}
</script>
