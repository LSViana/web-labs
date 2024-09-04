import { shallowReactive } from 'vue'

import type { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'

export function useWorklogList() {
  const value = shallowReactive<WorklogItem[]>([])

  function add(item: WorklogItem) {
    value.unshift(item)
  }

  function update(item: WorklogItem) {
    const index = value.findIndex(x => x.id === item.id)

    if (index > -1) {
      value[index] = item
    }
  }

  function remove(item: WorklogItem) {
    const index = value.indexOf(item)

    if (index > -1) {
      value.splice(index, 1)
    }
  }

  function load(items: WorklogItem[]) {
    value.splice(0, value.length, ...items)
  }

  return {
    value,
    add,
    update,
    load,
    remove
  }
}
