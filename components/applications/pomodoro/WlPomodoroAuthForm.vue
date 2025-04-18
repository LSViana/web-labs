<template>
  <div class="flex items-center justify-center">
    <form class="flex flex-col gap-3 rounded border p-3" @submit.prevent="listeners.submit">
      <p class="text-2xl">Sign In</p>
      <label for="email">Email</label>
      <WlInput
id="email"
v-model="email"
label="Email"
placeholder="example@example.com"/>
      <label for="password">Password</label>
      <WlInput
id="password"
v-model="password"
label="Password"
type="password"
placeholder="••••••••"/>
      <WlButton variant="primary" type="submit">Login</WlButton>
      <div v-if="pomodoroAuth.invalidCredentials.value" class="flex items-center justify-center gap-2 text-warning-400">
        <WlTriangleExclamationIcon/>
        <span>Invalid credentials</span>
      </div>
      <a href="#" class="text-center underline" @click.prevent="listeners.demo">Try without an account</a>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from '#app'
import { usePomodoroAuth } from '~/components/applications/pomodoro/usePomodoroAuth'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlInput from '~/components/experiments/forms-input/input/WlInput.vue'
import WlTriangleExclamationIcon from '~/components/shared/icons/static/WlTriangleExclamationIcon.vue'

const router = useRouter()

const pomodoroAuth = usePomodoroAuth()

const email = ref('')
const password = ref('')

const listeners = {
  async submit(): Promise<void> {
    await pomodoroAuth.login(email.value, password.value)

    if (pomodoroAuth.authenticated.value) {
      await router.push('/applications/pomodoro')
    }
  },
  async demo(): Promise<void> {
    await router.push('/applications/pomodoro/demo')
  }
}
</script>
