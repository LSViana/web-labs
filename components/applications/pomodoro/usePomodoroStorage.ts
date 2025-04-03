import { inject, provide } from 'vue'

import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import { usePomodoroNow } from '~/components/applications/pomodoro/usePomodoroNow'
import type { PomodoroItem } from '~/composables/server/pomodoro/types/pomodoroItem'

const url = '/api/pomodoro'

function transformPomodoroItem(item: PomodoroItem): PomodoroRecord {
  return new PomodoroRecord(
    item.id,
    new Date(item.startTime),
    new Date(item.endTime),
    item.type
  )
}

function buildPomodoroStorage() {
  const now = usePomodoroNow()

  async function save(record: PomodoroRecord): Promise<PomodoroRecord> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()

    return result
  }

  async function update(record: PomodoroRecord): Promise<void> {
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async function load(date: Date): Promise<PomodoroRecord[]> {
    const query = new URLSearchParams({
      date: date.toLocaleDateString()
    })

    const response = await fetch(`${url}?${query}`)

    const items = await response.json() as PomodoroItem[]

    return items.map(transformPomodoroItem)
  }

  async function remove(record: PomodoroRecord): Promise<void> {
    const query = new URLSearchParams({
      id: record.id.toString()
    })

    await fetch(`${url}?${query.toString()}`, {
      method: 'DELETE',
    })
  }

  async function loadToday(): Promise<PomodoroRecord[]> {
    return load(now.get())
  }

  return {
    save,
    update,
    load,
    remove,
    loadToday
  }
}


export function providePomodoroStorage() {
  provide('pomodoroStorage', buildPomodoroStorage())
}

export function usePomodoroStorage() {
  return inject('pomodoroStorage') as ReturnType<typeof buildPomodoroStorage>
}
