import { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'

const url = '/api/worklog-tracker/worklogs'

function transformWorklogItem(worklogItem: WorklogItem): WorklogItem {
  // TODO: Refactor this. It shouldn't be necessary to transform the date.
  return new WorklogItem(
    worklogItem.ticket,
    worklogItem.content,
    new Date(worklogItem.startTime),
    new Date(worklogItem.endTime),
    worklogItem.id,
    worklogItem.issueId
  )
}

export function useWorklogStorage() {
  async function load(date: Date): Promise<WorklogItem[]> {
    const query = new URLSearchParams({
      date: date.toLocaleDateString()
    })

    const response = await fetch(`${url}?${query}`)
    const items = await response.json() as WorklogItem[]

    return items.map(transformWorklogItem)
  }

  async function save(worklogItem: WorklogItem): Promise<WorklogItem> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(worklogItem),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()

    return transformWorklogItem(result)
  }

  async function remove(worklogItem: WorklogItem): Promise<void> {
    const query = new URLSearchParams({
      issueId: worklogItem.issueId,
      worklogId: worklogItem.id
    })

    await fetch(`${url}?${query.toString()}`, {
      method: 'DELETE'
    })
  }

  async function update(worklogItem: WorklogItem): Promise<void> {
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(worklogItem),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return {
    load,
    save,
    remove,
    update
  }
}
