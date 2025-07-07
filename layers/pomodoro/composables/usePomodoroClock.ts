import { computed, ref } from 'vue';

import { usePomodoroDate } from '~~/layers/pomodoro/composables/usePomodoroDate';
import { Interval } from '~~/layers/pomodoro/types/client/interval';
import {
  type PomodoroEventMap,
  PomodoroIntervalEvent,
  PomodoroNotificationEvent,
} from '~~/layers/pomodoro/types/client/pomodoroEvents';
import { PomodoroInterval } from '~~/layers/pomodoro/types/client/pomodoroInterval';
import { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';
import type { TypedEventHandler } from '~~/layers/pomodoro/types/client/typedEvent';
import { TypedEventBus } from '~~/layers/pomodoro/types/client/typedEventBus';

export function usePomodoroClock() {
  // Private
  let intervalId = -1;
  const eventBus = new TypedEventBus();
  const date = usePomodoroDate();

  const type = ref(PomodoroIntervalType.work);
  const startDate = ref(date.getNow());
  const endDate = ref(date.getNow());
  const notified = ref(false);
  const periodInterval = computed(() => getPeriodInterval(type.value));

  function getPeriodInterval(type: PomodoroIntervalType): Interval {
    switch (type) {
      case PomodoroIntervalType.work:
        return new Interval(0, 25, 0);
      case PomodoroIntervalType.break:
        return new Interval(0, 5, 0);
    }
  }

  // Public
  const isRunning = ref(false);
  const isInProgress = computed(() => interval.value.elapsedInterval.totalSeconds > 0);
  const isOvertime = computed(() => interval.value.elapsedInterval.totalSeconds > periodInterval.value.totalSeconds);

  const interval = computed(() => new PomodoroInterval(
    Interval.fromDates(startDate.value, endDate.value),
    periodInterval.value,
    type.value,
  ));

  function start() {
    pause();

    startDate.value = date.getNow();
    endDate.value = date.getNow();

    resume();
  }

  function resume(): void {
    intervalId = window.setInterval(() => {
      endDate.value = date.getNow();

      if (notified.value === false && interval.value.elapsedInterval.totalSeconds >= periodInterval.value.totalSeconds) {
        eventBus.trigger(new PomodoroNotificationEvent(type.value));
        notified.value = true;
      }
    }, 1_000);

    const totalMs = interval.value.elapsedInterval.totalSeconds * 1_000;

    endDate.value = date.getNow();
    startDate.value = new Date(date.getNow().getTime() - totalMs);

    isRunning.value = true;
  }

  function pause() {
    const pomodoroInterval = interval.value;

    isRunning.value = false;
    clearInterval(intervalId);

    if (interval.value.elapsedInterval.totalSeconds > 0) {
      eventBus.trigger(new PomodoroIntervalEvent(pomodoroInterval));
    }
  }

  function skip(): PomodoroInterval {
    const pomodoroInterval = interval.value;

    isRunning.value = false;
    notified.value = false;
    clearInterval(intervalId);

    if (type.value === PomodoroIntervalType.work) {
      type.value = PomodoroIntervalType.break;
    }
    else {
      type.value = PomodoroIntervalType.work;
    }

    startDate.value = date.getNow();
    endDate.value = date.getNow();

    eventBus.trigger(new PomodoroIntervalEvent(pomodoroInterval));

    return pomodoroInterval;
  }

  function on<K extends keyof PomodoroEventMap>(type: K, eventHandler: (event: PomodoroEventMap[K]) => void): void {
    eventBus.on(type, eventHandler as TypedEventHandler);
  }

  function off<K extends keyof PomodoroEventMap>(type: K, eventHandler: (event: PomodoroEventMap[K]) => void): void {
    eventBus.off(type, eventHandler as TypedEventHandler);
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
  };
}
