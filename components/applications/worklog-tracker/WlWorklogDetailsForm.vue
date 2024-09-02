<template>
  <div class="flex flex-col gap-3 rounded border p-3">
    <div class="flex gap-3">
      <WlInput v-model="ticket" placeholder="DEV-XXX" class="w-40"/>
      <div class="flex grow flex-col gap-1">
        <textarea
            v-model="content"
            class="max-h-40 min-h-10 overflow-y-hidden rounded border bg-slate-200 px-3 py-2 outline-0 focus:border-slate-400 dark:bg-slate-800"
            placeholder="Enter worklog here..."
            :rows="worklogLines"
        />
        <div class="flex gap-1 text-xs">
          <a href="#" class="rounded bg-slate-700 px-2 py-1" @click="listeners.testdome3849">TESTDOME-3849</a>
          <a href="#" class="rounded bg-slate-700 px-2 py-1" @click="listeners.testdome5928">TESTDOME-5928</a>
          <a href="#" class="rounded bg-slate-700 px-2 py-1" @click="listeners.clear">Clear</a>
        </div>
      </div>
      <WlTimeInput v-model="startTime" :step="60"/>
      <WlTimeInput v-model="endTime" :step="60"/>
      <span class="w-16 text-center">{{ worklogDuration }}</span>
    </div>
    <div class="flex gap-3">
      <template v-if="edit">
        <WlButton variant="primary" @click="listeners.save">Save</WlButton>
        <WlButton variant="secondary" @click="listeners.remove">Remove</WlButton>
      </template>
      <template v-else>
        <WlButton variant="primary" @click="listeners.save">Save</WlButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlInput from '~/components/experiments/forms-input/input/WlInput.vue'
import WlTimeInput from '~/components/experiments/forms-input/input/WlTimeInput.vue'
import { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'
import { useWorklogDuration } from '~/composables/server/worklog-tracker/useWorklogDuration'
import { useWorklogNow } from '~/composables/server/worklog-tracker/useWorklogNow'

type Props = {
  item: WorklogItem;
  edit: boolean;
}

type Emits = {
  (e: 'save', item: WorklogItem): void;
  (e: 'remove'): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const worklogNow = useWorklogNow()

const ticket = ref('')
const content = ref('')
const startTime = ref(worklogNow.get())
const endTime = ref(worklogNow.get())

const worklogLines = computed(() => props.item.content.split('\n').length)
const worklogDuration = useWorklogDuration(() => [startTime.value, endTime.value])

const listeners = {
  save(): void {
    if (!methods.validateSave()) {
      return
    }

    emit('save', new WorklogItem(ticket.value, content.value, startTime.value, endTime.value))
  },
  remove(): void {
    emit('remove')
  },
  testdome3849(): void {
    ticket.value = 'TESTDOME-3849'
    content.value = '- Check multiple mentions from Jira, Docs, and Gmail\n- Plan tasks for the day'
  },
  testdome5928(): void {
    ticket.value = 'TESTDOME-5928'
    content.value = 'Platform team daily meeting'
  },
  clear(): void {
    ticket.value = ''
    content.value = ''
  }
}

const methods = {
  validateSave(): boolean {
    const errors: string[] = []

    if (ticket.value.trim().length === 0) {
      errors.push('Ticket is required')
    }

    if (content.value.trim().length === 0) {
      errors.push('Content is required')
    }

    if (startTime.value.getTime() === endTime.value.getTime()) {
      errors.push('Start time and end time must be different')
    }

    if (startTime.value.getTime() > endTime.value.getTime()) {
      errors.push('Start time must be before end time')
    }

    if (errors.length > 0) {
      alert(errors.join('\n'))
    }

    return errors.length === 0
  }
}
</script>
