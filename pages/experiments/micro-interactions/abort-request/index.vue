<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>Cancel an event using an <code>AbortSignal</code> instance:</p>
      <WlExperimentCanvas>
        <div class="flex items-center gap-3">
          <WlButton ref="button" variant="primary" @click="listeners.click">
            Click
          </WlButton>
          <WlButton ref="button" variant="secondary" @click="listeners.cancel">
            Cancel
          </WlButton>
          <p>Result: <code>{{ result }}</code></p>
        </div>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlExperimentCanvas from '~/components/shared/experiments/WlExperimentCanvas.vue'
import WlContainer from '~/components/shared/layout/WlContainer.vue'

const result = ref('<empty>')
const loading = ref(false)
let abortController = new AbortController()

class UserCancelledError extends Error {
  constructor() {
    super('User cancelled the request.')
    this.name = 'UserCancelledError'
  }
}

const listeners = {
  async click() {
    loading.value = true

    try {
      const response = await fetch('/api/abort-request', {
        signal: abortController.signal,
      })
      result.value = await response.json()
    }
    catch (error) {
      if (error instanceof UserCancelledError) {
        result.value = '<cancelled>'
      }
      else {
        throw error
      }
    }

    loading.value = false
  },
  async cancel() {
    if (!loading.value) {
      alert('No operation in progress.')

      return
    }

    abortController.abort(new UserCancelledError())
    loading.value = false

    abortController = new AbortController()
  },
}
</script>
