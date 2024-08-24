<template>
  <div class="flex flex-wrap items-end gap-3">
    <div class="inline-flex flex-col">
      <label class="text-muted dark:text-muted-dark" for="pomodoro-record-details-start">Start</label>
      <WlTimeInput id="pomodoro-record-details-start" v-model="startDate"/>
    </div>
    <div class="inline-flex flex-col">
      <label class="text-muted dark:text-muted-dark" for="pomodoro-record-details-end">End</label>
      <WlTimeInput id="pomodoro-record-details-end" v-model="endDate"/>
    </div>
    <div class="inline-flex flex-col">
      <label class="text-muted dark:text-muted-dark" for="pomodoro-record-details-type">Type</label>
      <WlSelect id="pomodoro-record-details-type" v-model="type">
        <option v-for="item in types" :key="item" :value="item">{{ PomodoroIntervalTypeLabels[item] }}</option>
      </WlSelect>
    </div>
    <div class="flex gap-3">
      <WlButton variant="primary" @click="listeners.save">Save</WlButton>
      <WlButton variant="secondary" @click="listeners.close">Close</WlButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import { PomodoroIntervalType, PomodoroIntervalTypeLabels } from '~/components/applications/pomodoro/types/pomodoroType'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlSelect from '~/components/experiments/forms-input/input/WlSelect.vue'
import WlTimeInput from '~/components/experiments/forms-input/input/WlTimeInput.vue'

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
