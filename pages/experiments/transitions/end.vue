<template>
  <NuxtLayout name="home">
    <div class="flex justify-center p-3">
      <WlButton variant="primary" @click="listeners.click">
        View Details
      </WlButton>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRouter } from '#app'

import WlButton from '~/components/experiments/buttons/WlButton.vue'

const router = useRouter()

const methods = {
  goBack (): void {
    router.push('/experiments/transitions')
  }
}

const listeners = {
  click (): void {
    if (!document.startViewTransition) {
      methods.goBack()

      return
    }

    document.startViewTransition?.(() => methods.goBack())
  }
}
</script>

<style lang="scss">
@keyframes old {
  to {
    transform: scale(102%);
  }
}

@keyframes new {
  from {
    opacity: 0;
    transform: scale(98%);
  }
}

::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: unset;
}

::view-transition-old(root) {
  animation: 500ms ease-out old;
}

::view-transition-new(root) {
  animation: 500ms ease-out new;
}
</style>
