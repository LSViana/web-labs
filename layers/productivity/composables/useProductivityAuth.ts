import { useEventListener } from '@vueuse/core';
import { ref } from 'vue';

import { useCookie } from '#app';

export function useProductivityAuth() {
  const authenticated = ref(false);
  const invalidCredentials = ref(false);

  updateAuthenticated();
  useEventListener(window, 'focus', updateAuthenticated);

  const url = '/api/productivity/auth';

  async function login(email: string, password: string) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 204) {
      invalidCredentials.value = true;
      authenticated.value = false;
    }
    else {
      invalidCredentials.value = false;
      authenticated.value = true;
    }
  }

  async function logout() {
    await fetch(url, {
      method: 'DELETE',
    });

    authenticated.value = false;
  }

  function updateAuthenticated() {
    authenticated.value = Boolean(useCookie('authenticated').value);
  }

  return {
    authenticated,
    invalidCredentials,
    login,
    logout,
  };
}
