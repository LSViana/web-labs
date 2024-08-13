import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import type { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { useNow } from '~/components/applications/pomodoro/useNow'

export function usePomodoroStorage() {
  const now = useNow()

  function getKey(date: Date) {
    return `pomodoro-records-${date.toLocaleDateString(['en-US'])}`
  }

  function save(date: Date, records: PomodoroRecord[]) {
    localStorage.setItem(getKey(date), JSON.stringify(records))
  }

  function load(date: Date): PomodoroRecord[] {
    const value = localStorage.getItem(getKey(date))

    if (!value) {
      return []
    }

    const items: SerializedPomodoroRecord[] = JSON.parse(value)

    return items.map(x => new PomodoroRecord(new Date(x.startDate), new Date(x.endDate), x.type))
  }

  function saveToday(records: PomodoroRecord[]) {
    save(now.get(), records)
  }

  function loadToday(): PomodoroRecord[] {
    return load(now.get())
  }

  return {
    saveToday,
    loadToday
  }
}

/**
 * This type exists to help deserializing and loading the records into correct instances.
 */
type SerializedPomodoroRecord = { startDate: string; endDate: string; type: PomodoroIntervalType }
