<template>
  <div class="flex flex-wrap items-end gap-3">
    <div class="inline-flex flex-col">
      <WlLabel ref="startDateRef" for="pomodoro-record-details-start">Start</WlLabel>
      <WlTimeInput id="pomodoro-record-details-start" v-model="startDate"/>
    </div>
    <div class="inline-flex flex-col">
      <WlLabel for="pomodoro-record-details-end">End</WlLabel>
      <WlTimeInput id="pomodoro-record-details-end" v-model="endDate"/>
    </div>
    <div class="inline-flex flex-col">
      <WlLabel for="pomodoro-record-details-type">Type</WlLabel>
      <WlSelect id="pomodoro-record-details-type" v-model="type">
        <option v-for="item in types" :key="item" :value="item">{{ PomodoroIntervalTypeLabels[item] }}</option>
      </WlSelect>
    </div>
    <div class="flex gap-3">
      <WlButton variant="primary" @click="listeners.save">Save</WlButton>
      <WlButton v-if="!props.new" variant="danger" @click="listeners.delete">Delete</WlButton>
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
import WlLabel from '~/components/experiments/forms-input/WlLabel.vue'

type Emits = {
  (e: 'update:record', value: PomodoroRecord): void;
  (e: 'delete'): void;
  (e: 'close'): void;
}

type Props = {
  new: boolean;
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

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
    if (startDate.value >= endDate.value) {
      alert('Start time must be before end time.')

      return
    }

    const newRecord = new PomodoroRecord(startDate.value, endDate.value, type.value)

    emits('update:record', newRecord)
  },
  delete: (): void => {
    emits('delete')
  },
  close: (): void => {
    emits('close')
  }
}
</script>
