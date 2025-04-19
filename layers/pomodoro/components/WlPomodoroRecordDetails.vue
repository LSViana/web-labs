<template>
  <div class="flex flex-wrap items-end gap-3">
    <div class="inline-flex flex-col">
      <WlLabel ref="startDateRef" for="pomodoro-record-details-start">
        Start
      </WlLabel>
      <WlTimeInput
        id="pomodoro-record-details-start"
        v-model="startDate"
        show-seconds
        @keyup.enter="listeners.enterStartDate"
      />
    </div>
    <div class="inline-flex flex-col">
      <WlLabel ref="endDateRef" for="pomodoro-record-details-end">
        End
      </WlLabel>
      <WlTimeInput
        id="pomodoro-record-details-end"
        v-model="endDate"
        show-seconds
        @keyup.enter="listeners.enterEndDate"
      />
    </div>
    <div class="inline-flex flex-col">
      <WlLabel for="pomodoro-record-details-type">
        Type
      </WlLabel>
      <WlSelect id="pomodoro-record-details-type" v-model="type">
        <option v-for="item in types" :key="item" :value="item">
          {{ PomodoroIntervalTypeLabels[item] }}
        </option>
      </WlSelect>
    </div>
  </div>
  <div class="flex gap-3">
    <WlButton
      ref="saveRef"
      variant="primary"
      title="Save record (S)"
      @click="listeners.save"
    >
      <span class="underline">S</span>ave
    </WlButton>
    <WlButton
      v-if="!props.new"
      variant="danger"
      title="Delete record (D)"
      @click="listeners.delete"
    >
      <span class="underline">D</span>elete
    </WlButton>
    <WlButton variant="secondary" title="Close record (C)" @click="listeners.close">
      <span class="underline">C</span>lose
    </WlButton>
  </div>
</template>

<script setup lang="ts">
import { onKeyDown } from '@vueuse/core';
import { type ComponentPublicInstance, onMounted, ref, watch } from 'vue';

import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import WlSelect from '~~/layers/experiments/components/forms-input/input/WlSelect.vue';
import WlTimeInput from '~~/layers/experiments/components/forms-input/input/WlTimeInput.vue';
import WlLabel from '~~/layers/experiments/components/forms-input/WlLabel.vue';
import { PomodoroRecord } from '~~/layers/pomodoro/shared/types/pomodoroRecord';
import { PomodoroIntervalType, PomodoroIntervalTypeLabels } from '~~/layers/pomodoro/types/pomodoroType';

type Emits = {
  (e: 'update:record', value: PomodoroRecord): void
  (e: 'delete'): void
  (e: 'close'): void
};

type Props = {
  new: boolean
};

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const record = defineModel<PomodoroRecord>('record', { required: true });

const startDate = ref<Date>(record.value.startTime);
const endDate = ref<Date>(record.value.endTime);
const type = ref<PomodoroIntervalType>(record.value.type);
const startDateRef = ref<ComponentPublicInstance>();
const endDateRef = ref<ComponentPublicInstance>();
const saveRef = ref<ComponentPublicInstance>();

const types = Object.values(PomodoroIntervalType);

onKeyDown('s', () => listeners.save());
onKeyDown('d', () => listeners.delete());
onKeyDown('c', () => listeners.close());

onMounted(() => (startDateRef.value!.$el as HTMLElement).focus());

watch(
  record,
  () => {
    startDate.value = record.value.startTime;
    endDate.value = record.value.endTime;
    type.value = record.value.type;
  },
  { immediate: true },
);

const listeners = {
  enterStartDate() {
    (endDateRef.value!.$el as HTMLElement).focus();
  },
  enterEndDate() {
    (saveRef.value!.$el as HTMLElement).focus();
  },
  save() {
    if (startDate.value >= endDate.value) {
      alert('Start time must be before end time.');

      return;
    }

    const newRecord = new PomodoroRecord(record.value.id, startDate.value, endDate.value, type.value);

    emits('update:record', newRecord);
  },
  delete() {
    if (confirm('Are you sure you want to delete this record?')) {
      emits('delete');
    }
  },
  close() {
    if (document.activeElement?.tagName === 'INPUT') {
      // Avoids a copy operation will close the record.
      return;
    }

    emits('close');
  },
};
</script>
