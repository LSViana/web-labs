import { computed, ref } from 'vue'

import { Interval } from '~/components/applications/pomodoro/types/interval'
import {
  type PomodoroEventMap,
  PomodoroIntervalEvent,
  PomodoroNotificationEvent,
} from '~/components/applications/pomodoro/types/pomodoroEvents'
import { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import type { TypedEventHandler } from '~/components/applications/pomodoro/types/typedEvent'
import { TypedEventBus } from '~/components/applications/pomodoro/types/typedEventBus'
import { usePomodoroNow } from '~/components/applications/pomodoro/usePomodoroNow'

export function usePomodoroClock() {
  // Private
  let intervalId = -1
  const eventBus = new TypedEventBus()
  const now = usePomodoroNow()

  const type = ref(PomodoroIntervalType.work)
  const startDate = ref(now.get())
  const endDate = ref(now.get())
  const notified = ref(false)
  const periodInterval = computed(() => getPeriodInterval(type.value))

  function getPeriodInterval(type: PomodoroIntervalType): Interval {
    switch (type) {
      case PomodoroIntervalType.work:
        return new Interval(0, 25, 0)
      case PomodoroIntervalType.break:
        return new Interval(0, 5, 0)
    }
  }

  // Public
  const isRunning = ref(false)
  const isInProgress = computed(() => interval.value.elapsedInterval.totalSeconds > 0)
  const isOvertime = computed(() => interval.value.elapsedInterval.totalSeconds > periodInterval.value.totalSeconds)

  const interval = computed(() => new PomodoroInterval(
    Interval.fromDates(startDate.value, endDate.value),
    periodInterval.value,
    type.value,
  ))

  function start() {
    pause()

    startDate.value = now.get()
    endDate.value = now.get()

    resume()
  }

  function resume(): void {
    intervalId = window.setInterval(() => {
      endDate.value = now.get()

      if (notified.value === false && interval.value.elapsedInterval.totalSeconds >= periodInterval.value.totalSeconds) {
        eventBus.trigger(new PomodoroNotificationEvent(type.value))
        notified.value = true
      }
    }, 1_000)

    const totalMs = interval.value.elapsedInterval.totalSeconds * 1_000

    endDate.value = now.get()
    startDate.value = new Date(now.get().getTime() - totalMs)

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
    notified.value = false
    clearInterval(intervalId)

    if (type.value === PomodoroIntervalType.work) {
      type.value = PomodoroIntervalType.break
    }
    else {
      type.value = PomodoroIntervalType.work
    }

    startDate.value = now.get()
    endDate.value = now.get()

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
    off,
  }
}
