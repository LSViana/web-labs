import { inject, provide, ref } from 'vue';

import { WorklogItem } from '~~/layers/worklog-tracker/shared/types/worklogItem';

const url = '/api/worklog-tracker/worklogs';

function transformWorklogItem(worklogItem: WorklogItem): WorklogItem {
  // TODO: Refactor this. It shouldn't be necessary to transform the date.
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
      date: date.toLocaleDateString(),
    });

    const response = await fetch(`${url}?${query}`);
    const items = await response.json() as WorklogItem[];

    return items.map(transformWorklogItem);
  }

  async function save(worklogItem: WorklogItem): Promise<WorklogItem> {
    try {
      operationLoading.value = true;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(worklogItem),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      return transformWorklogItem(result);
    }
    finally {
      operationLoading.value = false;
    }
  }

  async function remove(worklogItem: WorklogItem): Promise<void> {
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
        body: JSON.stringify(worklogItem),
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
