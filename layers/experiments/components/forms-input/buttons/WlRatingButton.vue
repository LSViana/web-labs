<template>
  <WlButtonGroup class="wl-rating-button inline-flex">
    <WlButton
      v-for="i in 5"
      :key="i"
      :variant="props.variant"
      class="flex !p-2"
      @click="methods.onClick(i)"
    >
      <WlStarIcon :value="i <= props.value" />
    </WlButton>
  </WlButtonGroup>
</template>

<script lang="ts" setup>
import WlStarIcon from '~~/layers/base/components/icons/static/WlStarIcon.vue';
import WlButton, { type WlButtonVariant } from '~~/layers/experiments/components/forms-input/buttons/WlButton.vue';
import WlButtonGroup from '~~/layers/experiments/components/forms-input/buttons/WlButtonGroup.vue';

type Props = {
  value: number
  variant?: WlButtonVariant
};
type Events = {
  (e: 'update:value', event: number): void
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
});
const emits = defineEmits<Events>();

const methods = {
  onClick(value: number): void {
    emits('update:value', value);
  },
};
</script>
