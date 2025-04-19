<template>
  <WlButton variant="secondary" @click="listeners.throwError()">
    Throw Handled Error
  </WlButton>
</template>

<script lang="ts" setup>
import { createError } from '#app'
import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'

const listeners = {
  throwError() {
    throw createError({
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
    })
  },
}
</script>
