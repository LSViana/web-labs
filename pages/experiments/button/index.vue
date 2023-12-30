<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The <code>primary</code> button:</p>
      <ExperimentCanvas>
        <WlButton variant="primary" @click="methods.onClick">
          Get Started
        </WlButton>
        <template #caption>
          Used to perform the main actions. Clicked <code>{{ counter }}</code> times.
        </template>
      </ExperimentCanvas>
      <p>
        The icon button allows you to show an action quicker:
      </p>
      <ExperimentCanvas>
        <div class="inline-flex gap-2 rounded-full border bg-slate-200 p-1 dark:bg-slate-800">
          <WlIconButton variant="primary">
            <WlStarIcon value />
          </WlIconButton>
          <WlIconButton variant="danger">
            <WlTrashAnimatedIcon />
          </WlIconButton>
        </div>
      </ExperimentCanvas>
      <p>
        The confirm button allows you to perform the main action with a confirmation step:
      </p>
      <ExperimentCanvas>
        <WlConfirmDeleteButton @confirm="methods.onConfirm" />
        <template #caption>
          Used to confirm important actions. Confirmed: <code>{{ confirmed }}</code>.
        </template>
      </ExperimentCanvas>
      <p>
        The button group allows putting multiple actions together.
      </p>
      <ExperimentCanvas>
        <WlButtonGroup>
          <WlButton variant="secondary">
            Cancel
          </WlButton>
          <WlConfirmDeleteButton @confirm="methods.onConfirm" />
        </WlButtonGroup>
        <template #caption>
          Used to group actions.
        </template>
      </ExperimentCanvas>
      <p>
        The rating button allows the user to rate something.
      </p>
      <ExperimentCanvas>
        <WlRatingButton v-model:value="rating" />
        <template #caption>
          Used to evaluate aspects of something. Rating: <code>{{ rating }}</code>.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'
import WlButton from '~/components/experiments/buttons/WlButton.vue'
import WlConfirmDeleteButton from '~/components/experiments/buttons/WlConfirmDeleteButton.vue'
import WlButtonGroup from '~/components/experiments/buttons/WlButtonGroup.vue'
import WlRatingButton from '~/components/experiments/buttons/WlRatingButton.vue'
import WlStarIcon from '~/components/experiments/icons/static/WlStarIcon.vue'
import WlIconButton from '~/components/experiments/buttons/WlIconButton.vue'
import WlTrashAnimatedIcon from '~/components/experiments/icons/animated/WlTrashAnimatedIcon.vue'
import WlCheckIcon from '~/components/experiments/icons/static/WlCheckIcon.vue'

const counter = ref(0)
const confirmed = ref(false)
const rating = ref(3)

const methods = {
  onClick (): void {
    counter.value++
  },
  onConfirm (): void {
    confirmed.value = true
  }
}
</script>
