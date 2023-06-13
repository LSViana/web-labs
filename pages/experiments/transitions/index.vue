<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The View Transitions API example:</p>
      <ExperimentCanvas>
        <WlButton variant="primary" @click="listeners.click">
          View Details
        </WlButton>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRouter } from '#app'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlButton from '~/components/experiments/buttons/WlButton.vue'

const router = useRouter()

const methods = {
  goToDetails (): void {
    router.push('/experiments/transitions/end')
  }
}

const listeners = {
  click (): void {
    if (!document.startViewTransition) {
      methods.goToDetails()

      return
    }

    document.startViewTransition?.(() => {
      methods.goToDetails()
    })
  }
}
</script>
