<template>
  <NuxtLayout name="home">
    <WlContainer class="p-3">
      <div class="flex items-start gap-3 rounded border border-warning-500 bg-amber-500/10 p-3">
        <span class="pt-0.5">
          <WlTriangleExclamationIcon />
        </span>
        <div class="flex flex-col">
          <p class="font-bold">
            {{ props.error.statusCode }}
          </p>
          <p>{{ props.error.message }}</p>
          <div class="mt-3">
            <WlButton variant="secondary" @click="listeners.home">
              Go Home
            </WlButton>
          </div>
        </div>
      </div>
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { clearError, type NuxtError } from '#app';
import WlTriangleExclamationIcon from '~~/layers/base/components/icons/static/WlTriangleExclamationIcon.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';

type Props = {
  error: NuxtError
};

const props = defineProps<Props>();

// This composable allows accessing the global error being handled.
//
// The instance returned here is the same as `props.error`.
// const globalError = useError()

const listeners = {
  home() {
    clearError({
      redirect: '/',
    });
  },
};
</script>
