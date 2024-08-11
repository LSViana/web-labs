import { computed, ref } from 'vue'
import { Interval } from '~/components/applications/pomodoro/types/interval'
import { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'

export function usePomodoro() {
  // Private
  const workDurationMs = 25 * 60 * 1_000 // minutes
  let intervalId = -1

  const startDate = ref(new Date())
  const currentDate = ref(new Date())
  const type = ref(PomodoroIntervalType.work)
  const remaining = computed(() => new PomodoroInterval(
    calculateInterval(startDate.value, currentDate.value),
    startDate.value,
    type.value
  ))

  function calculateInterval(startDate: Date, endDate: Date) {
    const diffMs = endDate.getTime() - startDate.getTime()
    const diffSeconds = (workDurationMs - diffMs) / 1_000

    return new Interval(Math.floor(diffSeconds / 60), Math.floor(diffSeconds % 60))
  }

  // Public
  const isRunning = ref(false)

  function start() {
    pause()

    startDate.value = new Date()
    intervalId = window.setInterval(() => currentDate.value = new Date(), 1000)
    isRunning.value = true
  }

  function pause() {
    isRunning.value = false
    clearInterval(intervalId)
  }

  function skip(): PomodoroInterval {
    let interval: Interval

    if (isRunning.value) {
      pause()

      interval = calculateInterval(startDate.value, new Date())
    } else {
      interval = new Interval(0, 0)
    }

    const pomodoroInterval = new PomodoroInterval(
      interval,
      startDate.value,
      type.value
    )

    if (type.value === PomodoroIntervalType.work) {
      type.value = PomodoroIntervalType.break
    } else {
      type.value = PomodoroIntervalType.work
    }

    return pomodoroInterval
  }

  return {
    isRunning,
    remaining,
    start,
    pause,
    skip
  }
}
