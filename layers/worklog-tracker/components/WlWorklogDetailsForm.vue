<template>
  <div class="flex flex-col gap-3 rounded border p-3">
    <div class="flex gap-3">
      <WlInput v-model="ticket" placeholder="DEV-XXX" class="w-40" />
      <div class="flex grow flex-col gap-1">
        <textarea
          v-model="content"
          class="wl-worklog-content overflow-y-hidden rounded border bg-slate-200 px-3 py-2 outline-0 focus:border-slate-400 dark:bg-slate-800"
          placeholder="Enter worklog here..."
          :rows="worklogLines"
        />
      </div>
      <WlTimeInput v-model="startTime" />
      <WlTimeInput v-model="endTime" />
      <span class="w-16 shrink-0 pt-2 text-center">{{ worklogDuration }}</span>
    </div>
    <div class="flex gap-3">
      <template v-if="props.edit">
        <WlButton variant="primary" :disabled="props.disabled" @click="listeners.save">
          Save
        </WlButton>
        <WlButton variant="secondary" :disabled="props.disabled" @click="listeners.remove">
          Remove
        </WlButton>
        <WlButton variant="secondary" :disabled="props.disabled" @click="listeners.close">
          Close
        </WlButton>
      </template>
      <template v-else>
        <WlButton variant="primary" :disabled="props.disabled" @click="listeners.save">
          Save
        </WlButton>
        <WlButton variant="secondary" :disabled="props.disabled" @click="listeners.clear">
          Clear
        </WlButton>
      </template>
      <div class="grow" />
      <div class="flex gap-1 self-center text-xs">
        <a href="#" class="rounded bg-slate-700 px-2 py-1" @click="listeners.testdome3849">TESTDOME-3849</a>
        <a href="#" class="rounded bg-slate-700 px-2 py-1" @click="listeners.testdome5928">TESTDOME-5928</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import WlInput from '~~/layers/experiments/components/forms-input/input/WlInput.vue';
import WlTimeInput from '~~/layers/experiments/components/forms-input/input/WlTimeInput.vue';
import { useWorklogDurationFormat } from '~~/layers/worklog-tracker/composables/useWorklogDurationFormat';
import { WorklogItem } from '~~/layers/worklog-tracker/shared/types/worklogItem';
import { useWorklogNow } from '~~/layers/worklog-tracker/shared/useWorklogNow';

type Props = {
  item: WorklogItem
  edit: boolean
  disabled: boolean
};

type Emits = {
  (e: 'save', item: WorklogItem): void
  (e: 'remove'): void
  (e: 'close'): void
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const worklogNow = useWorklogNow();

const ticket = ref('');
const content = ref('');
const startTime = ref(worklogNow.get());
const endTime = ref(worklogNow.get());

const worklogLines = computed(() => content.value.split('\n').length);
const worklogDurationSeconds = computed(() => WorklogItem.calculateDuration(startTime.value, endTime.value));
const worklogDuration = useWorklogDurationFormat(worklogDurationSeconds);

watch(
  () => props.item,
  (newItem) => {
    ticket.value = newItem.ticket;
    content.value = newItem.content;
    startTime.value = newItem.startTime;
    endTime.value = newItem.endTime;
  },
);

const listeners = {
  save(): void {
    if (!methods.validateSave()) {
      return;
    }

    methods.normalize();

    emit('save', new WorklogItem(props.item.id, ticket.value, content.value, startTime.value, endTime.value, props.item.issueId, props.item.worklogId));
  },
  remove(): void {
    emit('remove');
  },
  close(): void {
    emit('close');
  },
  testdome3849(): void {
    ticket.value = 'TESTDOME-3849';
    content.value = '- Check multiple mentions from Jira, Docs, and Gmail\n- Plan tasks for the day';
  },
  testdome5928(): void {
    ticket.value = 'TESTDOME-5928';
    content.value = 'Platform team daily meeting';
  },
  clear(): void {
    ticket.value = '';
    content.value = '';
  },
};

const methods = {
  validateSave(): boolean {
    const errors: string[] = [];

    if (ticket.value.trim().length === 0) {
      errors.push('Ticket is required');
    }

    if (content.value.trim().length === 0) {
      errors.push('Content is required');
    }

    if (startTime.value.getTime() === endTime.value.getTime()) {
      errors.push('Start time and end time must be different');
    }

    if (startTime.value.getTime() > endTime.value.getTime()) {
      errors.push('Start time must be before end time');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    return errors.length === 0;
  },
  normalize(): void {
    ticket.value = ticket.value.trim().toUpperCase();
  },
};
</script>

<style lang="postcss" scoped>
.wl-worklog-content {
  field-sizing: content;
}
</style>
