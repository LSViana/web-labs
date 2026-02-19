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
      <div class="flex grow items-center gap-2 text-sm">
        <span class="font-semibold">Preview total time:</span>
        <span class="rounded bg-blue-600 px-2 py-1">{{ previewTotalDuration }}</span>
      </div>
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
        <a
          href="#"
          class="rounded bg-slate-700 px-2 py-1"
          title="Development"
          @click="listeners.dev()"
        >DEV</a>
        <a
          href="#"
          class="rounded bg-slate-700 px-2 py-1"
          title="Pull request handling"
          @click="listeners.devPullRequest()"
        >PR</a>
        <a
          href="#"
          class="rounded bg-slate-700 px-2 py-1"
          title="Code review"
          @click="listeners.devCodeReview"
        >CR</a>
        <a
          href="#"
          class="rounded bg-slate-700 px-2 py-1"
          title="Code review"
          @click="listeners.qualityAssurance"
        >QA</a>
      </div>
      <div class="flex gap-1 self-center text-xs">
        <a
          href="#"
          class="rounded bg-slate-700 px-2 py-1"
          title="Code review"
          @click="listeners.dev2934"
        >D-2934</a>
        <a
          href="#"
          class="rounded bg-slate-700 px-2 py-1"
          title="Worklog for TESTDOME-3849"
          @click="listeners.testdome3849"
        >T-3849</a>
        <a
          href="#"
          class="rounded bg-slate-700 px-2 py-1"
          title="Worklog for TESTDOME-5928"
          @click="listeners.testdome5928"
        >T-5928</a>
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
import { useWorklogNow } from '~~/layers/worklog-tracker/composables/useWorklogNow';
import { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';

type Props = {
  item: WorklogItem
  edit: boolean
  disabled: boolean
  existingItems: WorklogItem[]
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

// Calculate preview of total time for the day
const previewTotalSeconds = computed(() => {
  let total = 0;
  
  // Add all existing worklogs except the one being edited
  for (const existingItem of props.existingItems) {
    if (props.edit && existingItem.id === props.item.id) {
      continue; // Skip the item being edited
    }
    total += existingItem.durationSeconds;
  }
  
  // Add the current worklog duration
  total += worklogDurationSeconds.value;
  
  return total;
});
const previewTotalDuration = useWorklogDurationFormat(previewTotalSeconds);

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
  bug(): void {
    content.value = [
      '- Investigate & find the root cause',
      '- Apply & test the fixes',
    ].join('\n');
  },
  dev(): void {
    content.value = [
      'Development (round #):',
      '- Read the ticket & attached resources',
      '- Implement the changes',
      '- Test the changes locally',
      '- Update the QA documents',
      '- Write & submit the PR',
    ].join('\n');
  },
  devPullRequest(): void {
    content.value = [
      'Pull request handling (round #):',
      '- Apply the requested changes',
      '- Communication in the PR',
      '- Update the conclusion notes to reflect the latest changes',
      '- Send for testing (post the conclusion notes, deploy the QA env., etc.)',
    ].join('\n');
  },
  devCodeReview(): void {
    content.value = [
      'Code review (round #):',
      '- Read the ticket & PR',
      '- Review the code changes',
      '- Test the code changes locally',
      '- Communication in the PR',
      '- Request changes in the PR',
    ].join('\n');
  },
  qualityAssurance(): void {
    content.value = [
      'Testing (round #):',
      '- Investigate the failed requirements',
      '- Apply & test the fixes',
      '- Request another round of testing',
      '- Request another round of code review',
      '- Re-deploy the QA environment after fixes',
    ].join('\n');
  },
  dev2934(): void {
    ticket.value = 'DEV-2934';
    content.value = [
      'Handle support tickets (#)',
    ].join('\n');
  },
  testdome3849(): void {
    ticket.value = 'TESTDOME-3849';
    content.value = [
      '- Check multiple mentions from Jira, Docs, and Gmail',
      '- Plan tasks for the day',
    ].join('\n');
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
