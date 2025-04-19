<template>
  <div class="flex flex-col items-center gap-3 rounded border p-5">
    <WlPomodoroProgressCircle :interval="pomodoro.interval.value" />
    <div class="flex gap-3">
      <WlIconButton
        v-if="pomodoro.isOvertime.value"
        variant="danger"
        title="Finish interval (P)"
        @click="listeners.finishClick"
      >
        <WlStopIcon />
      </WlIconButton>
      <WlIconButton
        v-else-if="pomodoro.isRunning.value"
        variant="transparent"
        :class="pomodoroColor.backgroundInteractive"
        title="Pause timer (P)"
        @click="listeners.pauseClick"
      >
        <WlPauseIcon />
      </WlIconButton>
      <WlIconButton
        v-else
        variant="transparent"
        :class="pomodoroColor.backgroundInteractive"
        title="Start timer (P)"
        @click="listeners.playClick"
      >
        <WlPlayIcon class="ps-1" />
      </WlIconButton>
      <WlIconButton variant="secondary" title="Next interval (N)" @click="listeners.nextClick()">
        <WlForwardIcon />
      </WlIconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyDown } from '@vueuse/core';
import { computed, onMounted, onUnmounted } from 'vue';

import WlForwardIcon from '~~/layers/base/components/icons/static/WlForwardIcon.vue';
import WlPauseIcon from '~~/layers/base/components/icons/static/WlPauseIcon.vue';
import WlPlayIcon from '~~/layers/base/components/icons/static/WlPlayIcon.vue';
import WlStopIcon from '~~/layers/base/components/icons/static/WlStopIcon.vue';
import WlIconButton from '~~/layers/experiments/components/forms-input/buttons/WlIconButton.vue';
import WlPomodoroProgressCircle from '~~/layers/pomodoro/components/WlPomodoroProgressCircle.vue';
import { usePomodoroClock } from '~~/layers/pomodoro/composables/usePomodoroClock';
import type {
  PomodoroIntervalEvent,
  PomodoroNotificationEvent,
} from '~~/layers/pomodoro/types/pomodoroEvents';
import type { PomodoroInterval } from '~~/layers/pomodoro/types/pomodoroInterval';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/pomodoroType';
import { getPomodoroTypeColor } from '~~/layers/pomodoro/types/pomodoroTypeColor';

type Events = {
  (e: 'interval', value: PomodoroInterval): void
  (e: 'notification', type: PomodoroIntervalType): void
  (e: 'play'): void
};

const emits = defineEmits<Events>();
const pomodoro = usePomodoroClock();
const pomodoroColor = computed(() => getPomodoroTypeColor(pomodoro.interval.value.type));

onKeyDown('p', () => {
  if (pomodoro.isOvertime.value) {
    listeners.finishClick();
  }
  else if (pomodoro.isRunning.value) {
    listeners.pauseClick();
  }
  else {
    listeners.playClick();
  }
});
onKeyDown('n', () => listeners.nextClick());

onMounted(() => {
  pomodoro.on('interval', listeners.interval);
  pomodoro.on('notification', listeners.notification);
});
onUnmounted(() => {
  pomodoro.off('interval', listeners.interval);
  pomodoro.off('notification', listeners.notification);
});

const listeners = {
  playClick() {
    if (pomodoro.isInProgress.value) {
      pomodoro.resume();
    }
    else {
      pomodoro.start();
    }

    emits('play');
  },
  pauseClick() {
    pomodoro.pause();
  },
  finishClick() {
    pomodoro.skip();
  },
  nextClick() {
    pomodoro.skip();
  },
  interval(event: PomodoroIntervalEvent): void {
    emits('interval', event.interval);
  },
  notification(event: PomodoroNotificationEvent): void {
    emits('notification', event.intervalType);
  },
};
</script>
