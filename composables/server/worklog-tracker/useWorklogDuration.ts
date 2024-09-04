import type { ComputedGetter } from 'vue'
import { computed } from 'vue'

export function useWorklogDuration(dates: ComputedGetter<[Date, Date]>) {
  return computed(() => {
    const [start, end] = dates()

    const durationMinutes = Math.round((end.getTime() - start.getTime()) / 1000 / 60)

    if (durationMinutes < 60) {
      return `${durationMinutes}m`
    }

    const hours = Math.floor(durationMinutes / 60)
    const minutes = durationMinutes % 60

    return `${hours}h ${minutes}m`
  })
}
