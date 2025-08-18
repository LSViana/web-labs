import { provide, ref } from 'vue';

import { Optimistic } from '~~/layers/base/types/client/optmistic';
import type { useWorklogStorage } from '~~/layers/worklog-tracker/composables/useWorklogStorage';
import type { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';
import { WorklogItem as WorklogItemClass } from '~~/layers/worklog-tracker/types/client/worklogItem';

// Generate a demo ID counter
let demoIdCounter = 1;

function buildWorklogStorage(): ReturnType<typeof useWorklogStorage> {
  return {
    operationLoading: ref(false),
    load: () => Promise.resolve([]),
    save: (worklogItem: WorklogItem) => {
      // Return optimistic and promise for demo storage
      const optimistic = new WorklogItemClass(
        `temp_${-demoIdCounter}`, // negative ID for demo
        worklogItem.ticket,
        worklogItem.content,
        worklogItem.startTime,
        worklogItem.endTime,
        worklogItem.issueId,
        worklogItem.worklogId,
      );

      return new Optimistic(optimistic, () => Promise.resolve(new WorklogItemClass(
        `demo_${demoIdCounter++}`, // positive ID for "server" response
        worklogItem.ticket,
        worklogItem.content,
        worklogItem.startTime,
        worklogItem.endTime,
        worklogItem.issueId,
        worklogItem.worklogId,
      )));
    },
    remove: () => Promise.resolve(),
    update: () => Promise.resolve(),
  };
}

export function provideWorklogStorageDemo() {
  provide('worklogStorage', buildWorklogStorage());
}
