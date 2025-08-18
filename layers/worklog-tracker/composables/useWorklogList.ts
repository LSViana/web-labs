import { shallowReactive } from 'vue';

import type { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';

export function useWorklogList() {
  const value = shallowReactive<WorklogItem[]>([]);

  function add(item: WorklogItem) {
    const indexToAdd = value.findLastIndex(x => x.startTime > item.startTime);

    if (indexToAdd === -1) {
      value.unshift(item);
    }
    else {
      value.splice(indexToAdd + 1, 0, item);
    }
  }

  function update(item: WorklogItem) {
    const index = value.findIndex(x => x.id === item.id);

    if (index > -1) {
      value[index] = item;
    }
  }

  function remove(item: WorklogItem) {
    const index = value.indexOf(item);

    if (index > -1) {
      value.splice(index, 1);
    }
  }

  function load(items: WorklogItem[]) {
    value.splice(0, value.length, ...items);
  }

  function replaceById(oldId: string | undefined, newItem: WorklogItem) {
    const index = value.findIndex(x => x.id === oldId);
    if (index !== -1) {
      value.splice(index, 1);
      add(newItem);
    }
  }

  function removeById(id: string | undefined) {
    const index = value.findIndex(x => x.id === id);
    if (index !== -1) {
      value.splice(index, 1);
    }
  }

  function findIndexById(id: string | undefined): number {
    return value.findIndex(x => x.id === id);
  }

  return {
    value,
    add,
    update,
    load,
    remove,
    replaceById,
    removeById,
    findIndexById,
  };
}
