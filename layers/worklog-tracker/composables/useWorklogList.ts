import { shallowReactive } from 'vue';

import type { WorklogItem } from '~~/layers/worklog-tracker/shared/types/worklogItem';

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

  return {
    value,
    add,
    update,
    load,
    remove,
  };
}
