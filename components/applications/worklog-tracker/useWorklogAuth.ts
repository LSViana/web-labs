import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'

import { useCookie } from '#app'

export function useWorklogAuth() {
  const authenticated = ref(false)

  updateAuthenticated()
  useEventListener(window, 'focus', updateAuthenticated)

  async function login(email: string, password: string) {
    const response = await fetch('/api/worklog-tracker/worklogs/auth', {
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
      throw new Error('Failed to authenticate')
    }

    authenticated.value = true
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
    login,
    logout
  }
}
