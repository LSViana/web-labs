<template>
  <div v-if="authentication" class="rounded border bg-slate-200 p-3 dark:bg-slate-800">
    <p>
      Authenticated
      (
      <NuxtLink external class="cursor-pointer underline" @click="listeners.onGetUserInfo()">
        <span>get user info</span>
      </NuxtLink>
      )
    </p>
    <div class="mt-3 overflow-hidden">
      <p v-if="userInfo.loading.value">
        Loading...
      </p>
      <div v-else-if="userInfo.value.value">
        <pre>{{ userInfo.value.value }}</pre>
        <img
          class="my-3 rounded border"
          alt="Profile image of the user"
          :src="userInfo.value.value?.picture"
          style="width: 72px; height: 72px;"
        >
        <NuxtLink external :href="routes.discardUserInfo">
          <WlButton variant="primary">
            Discard User Info
          </WlButton>
        </NuxtLink>
      </div>
      <p v-else>
        No user info available.
      </p>
    </div>
  </div>
  <NuxtLink v-else :href="routes.login" external>
    <WlButton variant="primary">
      Login with Google
    </WlButton>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { isDevelopment } from 'std-env';
import { ref } from 'vue';

import { useCookie } from '#app';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';

const authentication = useCookie('google_auth', {
  secure: !isDevelopment,
});

const userInfo = {
  loading: ref(false),
  value: ref<{ id: string, picture: string }>(),
};

const routes = {
  login: '/api/auth/google/login',
  getUserInfo: '/api/auth/google/user-info',
  discardUserInfo: '/api/auth/google/discard',
};

const listeners = {
  onGetUserInfo(): void {
    methods.getUserInfo();
  },
};

const methods = {
  async getUserInfo(): Promise<void> {
    const response = await fetch('/api/auth/google/user-info');

    userInfo.value.value = await response.json();
  },
};
</script>
