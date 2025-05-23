import { provide, ref } from 'vue';

import type { useWorklogStorage } from '~~/layers/worklog-tracker/composables/useWorklogStorage';
import type { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';

function buildWorklogStorage(): ReturnType<typeof useWorklogStorage> {
  return {
    operationLoading: ref(false),
    load: () => Promise.resolve([]),
    save: (worklogItem: WorklogItem) => Promise.resolve(worklogItem),
    remove: () => Promise.resolve(),
    update: () => Promise.resolve(),
  };
}

export function provideWorklogStorageDemo() {
  provide('worklogStorage', buildWorklogStorage());
}
