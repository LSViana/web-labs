<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The variants of a button:</p>
      <WlExperimentCanvas>
        <div class="flex flex-col gap-3">
          <div class="flex gap-3">
            <WlButton variant="primary" :disabled="disabled" @click="listeners.clickCounter">
              Primary
            </WlButton>
            <WlButton variant="secondary" :disabled="disabled" @click="listeners.clickCounter">
              Secondary
            </WlButton>
            <WlButton variant="warning" :disabled="disabled" @click="listeners.clickCounter">
              Warning
            </WlButton>
            <WlButton variant="danger" :disabled="disabled" @click="listeners.clickCounter">
              Danger
            </WlButton>
          </div>
          <div class="flex gap-2">
            <input id="disabled" v-model="disabled" type="checkbox">
            <label for="disabled">Disabled</label>
          </div>
        </div>
        <template #caption>
          <span>Used to expose actions. Clicked <code>{{ counter }}</code> times. </span>
        </template>
      </WlExperimentCanvas>
      <p>
        The icon button allows you to show an action quicker:
      </p>
      <WlExperimentCanvas>
        <div class="inline-flex gap-2 rounded-full border bg-slate-200 p-1 dark:bg-slate-800">
          <WlIconButton variant="primary">
            <WlStarIcon value />
          </WlIconButton>
          <WlIconButton variant="danger">
            <WlTrashAnimatedIcon />
          </WlIconButton>
        </div>
      </WlExperimentCanvas>
      <p>
        The confirm button allows you to perform the main action with a confirmation step:
      </p>
      <WlExperimentCanvas>
        <WlConfirmDeleteButton @confirm="listeners.confirm" />
        <template #caption>
          Used to confirm important actions. Confirmed: <code>{{ confirmed }}</code>.
        </template>
      </WlExperimentCanvas>
      <p>
        The button group allows putting multiple actions together.
      </p>
      <WlExperimentCanvas>
        <WlButtonGroup>
          <WlButton variant="secondary">
            Cancel
          </WlButton>
          <WlConfirmDeleteButton @confirm="listeners.confirm" />
        </WlButtonGroup>
        <template #caption>
          Used to group actions.
        </template>
      </WlExperimentCanvas>
      <p>
        The rating button allows the user to rate something.
      </p>
      <WlExperimentCanvas>
        <WlRatingButton v-model:value="rating" />
        <template #caption>
          Used to evaluate aspects of something. Rating: <code>{{ rating }}</code>.
        </template>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import WlTrashAnimatedIcon from '~~/layers/base/components/icons/animated/WlTrashAnimatedIcon.vue';
import WlStarIcon from '~~/layers/base/components/icons/static/WlStarIcon.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue';
import WlButton from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import WlButtonGroup from '~~/layers/experiments/components/forms-input/buttons/WlButtonGroup.vue';
import WlConfirmDeleteButton from '~~/layers/experiments/components/forms-input/buttons/WlConfirmDeleteButton.vue';
import WlIconButton from '~~/layers/experiments/components/forms-input/buttons/WlIconButton.vue';
import WlRatingButton from '~~/layers/experiments/components/forms-input/buttons/WlRatingButton.vue';

const counter = ref(0);
const confirmed = ref(false);
const rating = ref(3);
const disabled = ref(false);

const listeners = {
  clickCounter(): void {
    counter.value++;
  },
  clickDisable(): void {
    disabled.value = !disabled.value;
  },
  confirm(): void {
    confirmed.value = true;
  },
};
</script>
