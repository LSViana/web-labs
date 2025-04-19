<template>
  <WlInput
    v-model="innerValue"
    type="text"
    :class="classes"
    @update:model-value="listeners.update"
    @keydown.enter="listeners.input"
    @blur="listeners.input"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import WlInput from '~/components/experiments/forms-input/input/WlInput.vue';

type Props = {
  showSeconds?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSeconds: false,
})

const model = defineModel<Date>({ required: true })
const innerValue = ref('')

const classes = computed(() => [
  'text-center',
  props.showSeconds ? 'w-24' : 'w-20',
])

onMounted(() => innerValue.value = methods.formatFromDate(model.value))

watch(() => model.value, (newValue: Date) => innerValue.value = methods.formatFromDate(newValue))

const listeners = {
  update(): void {
    const time = innerValue.value

    if (time[time.length - 1] === ':') {
      return
    }

    if (time.length < 3) {
      const numberTime = parseInt(time)

      if (isNaN(numberTime)) {
        innerValue.value = ''

        return
      }

      if (numberTime == 0 || numberTime === 1 || numberTime === 2) {
        return
      }
      else {
        innerValue.value += ':'
      }
    }

    if (props.showSeconds && time.length > 3 && time.length < 6) {
      const minutes = Number(time.split(':')[1])

      if (minutes >= 10) {
        innerValue.value += ':'
      }
    }
  },
  input(): void {
    const time = innerValue.value
    const maxLength = props.showSeconds ? 8 : 5

    if (time.length < 3 || time.length > maxLength) {
      innerValue.value = methods.formatFromDate(model.value)

      return
    }

    let [hours, minutes, seconds] = time.split(':').map(x => Number(x ?? 0))

    if (hours == null || minutes == null) {
      innerValue.value = methods.formatFromDate(model.value)

      return
    }

    hours = Math.min(23, Math.max(0, hours))
    minutes = Math.min(59, Math.max(0, minutes))
    seconds = Math.min(59, Math.max(0, seconds ?? 0))

    if (!props.showSeconds) {
      seconds = model.value.getSeconds()
    }

    if (isNaN(hours) || isNaN(minutes)) {
      innerValue.value = methods.formatFromDate(model.value)

      return
    }

    const newDate = methods.formatToDate(`${hours}:${minutes}:${seconds}`)

    model.value = newDate
  },
}

const methods = {
  formatFromDate(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    if (props.showSeconds) {
      return `${hours}:${minutes}:${seconds}`
    }
    else {
      return `${hours}:${minutes}`
    }
  },
  formatToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':')
    const currentYear = model.value.getFullYear()
    const currentMonth = model.value.getMonth()
    const currentDate = model.value.getDate()

    return new Date(currentYear, currentMonth, currentDate, Number(hours), Number(minutes), Number(seconds))
  },
}
</script>
