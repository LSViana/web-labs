import { inject, provide, ref } from 'vue';

import { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';
import type { WorklogItemDto } from '~~/layers/worklog-tracker/types/transfer/worklogItemDto';
import { WorklogItemMapper } from '~~/layers/worklog-tracker/types/transfer/worklogItemMapper';

const url = '/api/worklog-tracker/worklogs';

function transformWorklogItem(worklogItem: WorklogItemDto): WorklogItem {
  return new WorklogItem(
    worklogItem.id,
    worklogItem.ticket,
    worklogItem.content,
    new Date(worklogItem.startTime),
    new Date(worklogItem.endTime),
    worklogItem.issueId,
    worklogItem.worklogId,
  );
}

function buildWorklogStorage() {
  const operationLoading = ref(false);

  async function load(date: Date): Promise<WorklogItem[]> {
    const query = new URLSearchParams({
      date: date.toISOString(),
    });

    const response = await fetch(`${url}?${query}`);
    const items = await response.json() as WorklogItemDto[];

    return items.map(transformWorklogItem);
  }

  async function save(worklogItem: WorklogItem): Promise<WorklogItem> {
    try {
      operationLoading.value = true;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(WorklogItemMapper.fromClient(worklogItem)),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json() as WorklogItemDto;

      return transformWorklogItem(result);
    }
    finally {
      operationLoading.value = false;
    }
  }

  async function remove(worklogItem: WorklogItem): Promise<void> {
    if (worklogItem.id === undefined) {
      throw new Error('Worklog item has no ID.');
    }

    try {
      operationLoading.value = true;

      const query = new URLSearchParams({
        id: worklogItem.id,
      });

      await fetch(`${url}?${query.toString()}`, {
        method: 'DELETE',
      });
    }
    finally {
      operationLoading.value = false;
    }
  }

  async function update(worklogItem: WorklogItem): Promise<void> {
    try {
      operationLoading.value = true;

      await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(WorklogItemMapper.fromClient(worklogItem)),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    finally {
      operationLoading.value = false;
    }
  }

  return {
    operationLoading,
    load,
    save,
    remove,
    update,
  };
}

export function provideWorklogStorage() {
  provide('worklogStorage', buildWorklogStorage());
}

export function useWorklogStorage() {
  return inject('worklogStorage') as ReturnType<typeof buildWorklogStorage>;
}
