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

  const startDate = ref(new Date())
  const endDate = ref(new Date())
  const currentDate = ref(new Date())
  const type = ref(PomodoroIntervalType.work)

  const interval = computed(() => new PomodoroInterval(
    currentDate.value,
    startDate.value,
    endDate.value,
    type.value
  ))

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

  function start() {
    pause()

    startDate.value = new Date()
    endDate.value = getPeriodInterval(type.value).addToDate(startDate.value)

    currentDate.value = startDate.value
    intervalId = window.setInterval(() => {
      currentDate.value = new Date()

      if (currentDate.value >= endDate.value) {
        skip()
      }
    }, 1000)
    isRunning.value = true
  }

  function pause() {
    isRunning.value = false
    clearInterval(intervalId)
  }

  function skip(): PomodoroInterval {
    pause()

    const pomodoroInterval = new PomodoroInterval(
      currentDate.value,
      startDate.value,
      endDate.value,
      type.value
    )

    if (type.value === PomodoroIntervalType.work) {
      type.value = PomodoroIntervalType.break
    } else {
      type.value = PomodoroIntervalType.work
    }

    currentDate.value = startDate.value
    endDate.value = getPeriodInterval(type.value).addToDate(startDate.value)

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
    interval,
    start,
    pause,
    skip,
    on,
    off
  }
}
