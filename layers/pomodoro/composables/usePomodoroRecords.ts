import { shallowReactive } from 'vue';

import type { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';

export function usePomodoroRecords() {
  const value = shallowReactive<PomodoroRecord[]>([]);

  function add(record: PomodoroRecord) {
    let index = -1;

    if (value.length === 0 || value[0] == null) {
      index = 0;
    }
    else if (value[0].startTime >= record.endTime) {
      index = 0;
    }
    else {
      const nextIndex = value.findLastIndex(x => x.endTime <= record.startTime);

      // There will always be a next record since the first one starts before the new record.
      index = nextIndex + 1;
    }

    value.splice(index, 0, record);
  }

  function update(record: PomodoroRecord, index: number) {
    remove(index);
    add(record);
  }

  function remove(index: number) {
    value.splice(index, 1);
  }

  function load(records: PomodoroRecord[]) {
    value.splice(0, value.length, ...records);
  }

  function replaceById(oldId: number | undefined, newRecord: PomodoroRecord) {
    const index = value.findIndex(r => r.id === oldId);

    if (index !== -1) {
      value.splice(index, 1);
      add(newRecord);
    }
  }

  function removeById(id: number | undefined) {
    const index = value.findIndex(r => r.id === id);

    if (index !== -1) {
      value.splice(index, 1);
    }
  }

  function findIndexById(id: number | undefined): number {
    return value.findIndex(r => r.id === id);
  }

  return {
    value,
    add,
    update,
    remove,
    load,
    replaceById,
    removeById,
    findIndexById,
  };
}
