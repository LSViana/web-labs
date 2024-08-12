<template>
  <div class="flex flex-col items-center gap-3 border p-5">
    <WlPomodoroProgressCircle :interval="pomodoro.interval.value"/>
    <div class="flex gap-3">
      <WlIconButton
          v-if="pomodoro.isOvertime.value"
          variant="danger"
          title="Finish interval"
          @click="listeners.finishClick"
      >
        <WlStopIcon/>
      </WlIconButton>
      <WlIconButton
          v-else-if="pomodoro.isRunning.value"
          variant="transparent"
          :class="pomodoroColor.backgroundInteractive"
          title="Pause timer"
          @click="listeners.pauseClick"
      >
        <WlPauseIcon/>
      </WlIconButton>
      <WlIconButton
          v-else
          variant="transparent"
          :class="pomodoroColor.backgroundInteractive"
          title="Start timer"
          @click="listeners.playClick"
      >
        <WlPlayIcon class="ps-1"/>
      </WlIconButton>
      <WlIconButton variant="secondary" title="Skip interval" @click="listeners.skipClick()">
        <WlForwardIcon/>
      </WlIconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePomodoro } from '~/components/applications/pomodoro/usePomodoro'
import WlIconButton from '~/components/experiments/forms-input/buttons/WlIconButton.vue'
import WlPlayIcon from '~/components/shared/icons/static/WlPlayIcon.vue'
import WlPauseIcon from '~/components/shared/icons/static/WlPauseIcon.vue'
import WlForwardIcon from '~/components/shared/icons/static/WlForwardIcon.vue'
import WlPomodoroProgressCircle from '~/components/applications/pomodoro/WlPomodoroProgressCircle.vue'
import type { PomodoroInterval } from '~/components/applications/pomodoro/types/pomodoroInterval'
import { computed, onMounted, onUnmounted } from 'vue'
import type { PomodoroIntervalEvent } from '~/components/applications/pomodoro/types/pomodoroEvents'
import { getPomodoroTypeColor } from '~/components/applications/pomodoro/types/pomodoroTypeColor'
import WlStopIcon from '~/components/shared/icons/static/WlStopIcon.vue'

type Events = {
  (e: 'interval', value: PomodoroInterval): void;
  (e: 'play'): void;
}

const emits = defineEmits<Events>()
const pomodoro = usePomodoro()
const pomodoroColor = computed(() => getPomodoroTypeColor(pomodoro.interval.value.type))

onMounted(() => pomodoro.on('interval', listeners.interval))
onUnmounted(() => pomodoro.off('interval', listeners.interval))

const listeners = {
  playClick() {
    if (pomodoro.isInProgress.value) {
      pomodoro.resume()
    } else {
      pomodoro.start()
    }

    emits('play')
  },
  pauseClick() {
    pomodoro.pause()
  },
  finishClick() {
    pomodoro.skip()
  },
  skipClick() {
    pomodoro.skip()
  },
  interval(event: PomodoroIntervalEvent): void {
    emits('interval', event.interval)
  }
}
</script>
