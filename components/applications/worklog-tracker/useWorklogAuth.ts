import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'

import { useCookie } from '#app'

export function useWorklogAuth() {
  const authenticated = ref(false)
  const invalidCredentials = ref(false)

  updateAuthenticated()
  useEventListener(window, 'focus', updateAuthenticated)

  async function login(email: string, password: string) {
    const response = await fetch('/api/productivity/auth', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 204) {
      invalidCredentials.value = true
      authenticated.value = false
    } else {
      invalidCredentials.value = false
      authenticated.value = true
    }
  }

  async function logout() {
    await fetch('/api/worklog-tracker/worklogs/auth', {
      method: 'DELETE'
    })

    authenticated.value = false
  }

  function updateAuthenticated() {
    authenticated.value = Boolean(useCookie('authenticated').value)
  }

  return {
    authenticated,
    invalidCredentials,
    login,
    logout
  }
}
