import { computed, ref } from 'vue'
import { Interval } from '~/components/applications/pomodoro/types/interval'
import { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { type PomodoroEventMap, PomodoroIntervalEvent } from '~/components/applications/pomodoro/types/pomodoroEvents'
import { TypedEventBus } from '~/components/applications/pomodoro/types/typedEventBus'
import type { TypedEventHandler } from '~/components/applications/pomodoro/types/typedEvent'

export function usePomodoro() {
  // Private
  let intervalId = -1
  const eventBus = new TypedEventBus()

  const type = ref(PomodoroIntervalType.work)
  const startDate = ref(new Date())
  const endDate = ref(new Date())
  const periodInterval = computed(() => getPeriodInterval(type.value))

  function getPeriodInterval(type: PomodoroIntervalType): Interval {
    switch (type) {
      case PomodoroIntervalType.work:
        return new Interval(25, 0)
      case PomodoroIntervalType.break:
        return new Interval(5, 0)
      default:
        throw Error(`Unable to calculate duration for ${type}.`)
    }
  }

  // Public
  const isRunning = ref(false)
  const isInProgress = computed(() => interval.value.elapsedInterval.totalSeconds > 0)
  const isOvertime = computed(() => interval.value.elapsedInterval.totalSeconds > periodInterval.value.totalSeconds)

  const interval = computed(() => new PomodoroInterval(
    Interval.fromDates(startDate.value, endDate.value),
    periodInterval.value,
    type.value
  ))

  function start() {
    pause()

    startDate.value = new Date()
    endDate.value = new Date()

    resume()
  }

  function resume(): void {
    intervalId = window.setInterval(() => {
      endDate.value = new Date()

      if (interval.value.elapsedInterval.totalSeconds >= periodInterval.value.totalSeconds) {
        // TODO: Notify.
      }
    }, 1_000)

    const totalMs = interval.value.elapsedInterval.totalSeconds * 1_000

    endDate.value = new Date()
    startDate.value = new Date(new Date().getTime() - totalMs)

    isRunning.value = true
  }

  function pause() {
    const pomodoroInterval = interval.value

    isRunning.value = false
    clearInterval(intervalId)

    if (interval.value.elapsedInterval.totalSeconds > 0) {
      eventBus.trigger(new PomodoroIntervalEvent(pomodoroInterval))
    }
  }

  function skip(): PomodoroInterval {
    const pomodoroInterval = interval.value

    isRunning.value = false
    clearInterval(intervalId)

    if (type.value === PomodoroIntervalType.work) {
      type.value = PomodoroIntervalType.break
    } else {
      type.value = PomodoroIntervalType.work
    }

    startDate.value = new Date()
    endDate.value = new Date()

    eventBus.trigger(new PomodoroIntervalEvent(pomodoroInterval))

    return pomodoroInterval
  }

  function on<K extends keyof PomodoroEventMap>(type: K, eventHandler: (event: PomodoroEventMap[K]) => void): void {
    eventBus.on(type, eventHandler as TypedEventHandler)
  }

  function off<K extends keyof PomodoroEventMap>(type: K, eventHandler: (event: PomodoroEventMap[K]) => void): void {
    eventBus.off(type, eventHandler as TypedEventHandler)
  }

  return {
    isRunning,
    isInProgress,
    isOvertime,
    interval,
    start,
    pause,
    resume,
    skip,
    on,
    off
  }
}
