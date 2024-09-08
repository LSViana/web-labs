import { computed, type MaybeRef, unref } from 'vue'

export function useWorklogDurationFormat(durationSeconds: MaybeRef<number>) {
  return computed(() => {
    const durationSecondsValue = unref(durationSeconds)
    const durationMinutes = Math.floor(durationSecondsValue / 60)

    if (durationMinutes < 60) {
      return `${durationMinutes}m`
    }

    const hours = Math.floor(durationMinutes / 60)
    const minutes = durationMinutes % 60

    return `${hours}h ${minutes}m`
  })
}
