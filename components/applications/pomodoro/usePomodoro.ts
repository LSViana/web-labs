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
  const periodInterval = computed(() => getPeriodInterval(type.value))
  const startDate = ref(new Date())
  const elapsedSeconds = ref(0)

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
  const isInProgress = computed(() => elapsedSeconds.value > 0)

  const interval = computed(() => new PomodoroInterval(
    new Interval(0, elapsedSeconds.value),
    periodInterval.value,
    type.value
  ))

  function start() {
    pause()

    startDate.value = new Date()
    elapsedSeconds.value = 0

    resume()
  }

  function resume(): void {
    intervalId = window.setInterval(() => {
      elapsedSeconds.value++

      if (elapsedSeconds.value >= periodInterval.value.totalSeconds) {
        skip()
      }
    }, 1_000)

    isRunning.value = true
  }

  function pause() {
    const pomodoroInterval = interval.value

    isRunning.value = false
    clearInterval(intervalId)

    if (elapsedSeconds.value > 0) {
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

    elapsedSeconds.value = 0

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
    interval,
    start,
    pause,
    resume,
    skip,
    on,
    off
  }
}
