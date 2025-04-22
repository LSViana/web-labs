<template>
  <div class="wl-progress relative flex aspect-square flex-col items-center justify-center" :style="progressStyles">
    <svg class="absolute inset-0 overflow-hidden rounded-full" width="100%" height="100%">
      <circle
        class="wl-circle relative fill-none stroke-slate-900"
        cx="50%"
        cy="50%"
        r="50%"
        stroke-width="1rem"
      />
      <circle
        class="fill-none"
        :class="pomodoroColor.stroke"
        cx="50%"
        cy="50%"
        r="50%"
        stroke-width="1rem"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <p class="absolute -translate-y-10 capitalize text-muted dark:text-muted-dark">
      {{ props.interval.type }}
    </p>
    <p class="relative font-bold" :class="intervalClasses">
      {{ props.interval.remainingInterval }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue';

import type { PomodoroInterval } from '~~/layers/pomodoro/types/client/pomodoroInterval';
import { getPomodoroTypeColor } from '~~/layers/pomodoro/types/client/pomodoroTypeColor';

type Props = {
  interval: PomodoroInterval
};

const size = 180;
const radius = size / 2;
const circumference = 2 * Math.PI * radius;

const props = defineProps<Props>();
const pomodoroColor = computed(() => getPomodoroTypeColor(props.interval.type));
const hasHours = computed(() => Math.abs(props.interval.remainingInterval.hours) > 0);

const progressStyles = computed<Partial<StyleValue>>(() => ({
  width: `${size}px`,
}));
const intervalClasses = computed(() => [hasHours.value ? 'text-4xl' : 'text-5xl']);
const dashArray = computed(() => {
  const dash = Math.max(0, props.interval.remainingProgress) * circumference;

  return `${dash} ${circumference - dash}`;
});
const dashOffset = computed(() => circumference / 4);
</script>
