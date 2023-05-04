<template>
  <div :class="classes" class="flex justify-end gap-2 pt-1 transition-opacity">
    <div class="relative flex items-center justify-end">
      <span class="invisible" aria-hidden="true">x</span>
      <span
        v-for="(label, key, index) in PasswordStrength"
        :key="key"
        class="absolute text-sm font-semibold shadow-white drop-shadow transition-[opacity,transform] duration-300"
        :class="[ strengthValue === index ? 'delay-100' : '-translate-y-3 opacity-0', passwordStrengthTextClasses[label] ]"
      >
        {{ label }}
      </span>
    </div>

    <div class="flex items-center gap-1 pr-1">
      <div
        v-for="(label, key, index) in PasswordStrength"
        :key="key"
        class="mt-0.5 h-1 w-4 rounded transition-colors"
        :class="[ strengthValue >= index ? passwordStrengthContainerClasses[label] : 'bg-slate-600' ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

enum PasswordStrength {
  weak = 'Weak',
  medium = 'Medium',
  strong = 'Strong',
}

const passwordStrengthTextClasses: Record<PasswordStrength, string> = {
  [PasswordStrength.weak]: 'text-red-500',
  [PasswordStrength.medium]: 'text-yellow-500',
  [PasswordStrength.strong]: 'text-green-500'
}

const passwordStrengthContainerClasses: Record<PasswordStrength, string> = {
  [PasswordStrength.weak]: 'bg-red-500',
  [PasswordStrength.medium]: 'bg-yellow-500',
  [PasswordStrength.strong]: 'bg-green-500'
}

type Props = {
  value: string;
};

const props = defineProps<Props>()

const strength = computed(() => {
  const value = props.value
  const length = value.length

  if (length < 8) {
    return PasswordStrength.weak
  }

  if (length < 12) {
    return PasswordStrength.medium
  }

  return PasswordStrength.strong
})
const strengthValue = computed(() => Object.values(PasswordStrength).indexOf(strength.value))
const classes = computed(() => [
  props.value.length === 0 ? 'opacity-0' : ''
])
</script>
