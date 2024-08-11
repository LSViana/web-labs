<template>
  <div class="flex flex-col items-center gap-3 border p-5">
    <WlPomodoroProgressCircle
        :progress="pomodoro.interval.value.remainingProgress"
        :text="pomodoro.interval.value.remainingInterval.toString()"
    />
    <div class="flex gap-3">
      <WlIconButton v-if="pomodoro.isRunning.value" variant="primary" title="Pause timer" @click="listeners.pauseClick">
        <WlPauseIcon/>
      </WlIconButton>
      <WlIconButton v-else variant="primary" title="Start timer" @click="listeners.playClick">
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

const pomodoro = usePomodoro()

const listeners = {
  playClick() {
    if (pomodoro.isInProgress.value) {
      pomodoro.resume()
    } else {
      pomodoro.start()
    }
  },
  pauseClick() {
    pomodoro.pause()
  },
  skipClick() {
    pomodoro.skip()
  }
}
</script>
