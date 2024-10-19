import { provide, ref } from 'vue'

import type { useWorklogStorage } from '~/components/applications/worklog-tracker/useWorklogStorage'
import type { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'

function buildWorklogStorage(): ReturnType<typeof useWorklogStorage> {
  return {
    operationLoading: ref(false),
    load: () => Promise.resolve([]),
    save: (worklogItem: WorklogItem) => Promise.resolve(worklogItem),
    remove: () => Promise.resolve(),
    update: () => Promise.resolve()
  }
}

export function provideWorklogStorageDemo() {
  provide('worklogStorage', buildWorklogStorage())
}
