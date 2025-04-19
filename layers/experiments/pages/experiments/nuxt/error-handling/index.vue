<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <h1 class="text-xl">
        Error Handling
      </h1>
      <p>The <code>createError()</code> composable:</p>
      <WlExperimentCanvas>
        <div class="flex gap-3">
          <WlButton variant="secondary" @click="listeners.throwError">
            Throw Error
          </WlButton>
          <WlButton variant="secondary" @click="listeners.throwFatalError">
            Throw Fatal Error
          </WlButton>
        </div>
      </WlExperimentCanvas>
      <p>The <code>showError()</code> composable:</p>
      <WlExperimentCanvas>
        <div class="flex gap-3">
          <WlButton variant="secondary" @click="listeners.showError">
            Show Error
          </WlButton>
        </div>
      </WlExperimentCanvas>
      <p>The <code>NuxtErrorBoundary</code> component:</p>
      <WlExperimentCanvas>
        <div class="flex gap-3">
          <NuxtErrorBoundary @error="listeners.logError">
            <WlErrorBoundarySample />
            <template #error="error">
              <div>
                <p>Error details:</p>
                <pre><code>{{ error }}</code></pre>
              </div>
            </template>
          </NuxtErrorBoundary>
        </div>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { createError, isNuxtError, showError } from '#app';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import WlErrorBoundarySample from '~~/layers/experiments/components/nuxt/error-handling/WlErrorBoundarySample.vue';

const listeners = {
  throwError() {
    methods.throwError();
  },
  throwFatalError() {
    methods.throwError(true);
  },
  showError() {
    throw showError({
      message: 'This is a regular error.',
      cause: 'The cause of the error.',
      data: 'The data of the error.',
      fatal: false,
      name: 'The error name.',
      stack: 'The error stack.',
      status: 400,
      statusCode: 400,
      statusMessage: 'The status message.',
      statusText: 'The status text.',
      unhandled: false,
    });
  },
  logError(error: unknown) {
    if (!isNuxtError(error)) {
      throw error;
    }

    console.log('logError', { error });
  },
};

const methods = {
  throwError(fatal = false) {
    throw createError({
      message: 'This is a regular error.',
      cause: 'The cause of the error.',
      data: 'The data of the error.',
      fatal: fatal,
      name: 'The error name.',
      stack: 'The error stack.',
      status: 400,
      statusCode: 400,
      statusMessage: 'The status message.',
      statusText: 'The status text.',
      unhandled: false,
    });
  },
};
</script>
