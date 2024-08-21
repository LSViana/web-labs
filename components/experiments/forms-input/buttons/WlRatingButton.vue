<template>
  <WlButtonGroup class="wl-rating-button inline-flex">
    <WlButton v-for="i in 5" :key="i" :variant="props.variant" class="flex !p-2" @click="methods.onClick(i)">
      <WlStarIcon :value="i <= props.value" />
    </WlButton>
  </WlButtonGroup>
</template>

<script lang="ts" setup>
import WlButton, { type WlButtonVariant } from '~/components/experiments/forms-input/buttons/WlButton.vue'
import WlButtonGroup from '~/components/experiments/forms-input/buttons/WlButtonGroup.vue'
import WlStarIcon from '~/components/shared/icons/static/WlStarIcon.vue'

type Props = {
  value: number;
  variant?: WlButtonVariant;
};
type Events = {
  (e: 'update:value', event: number): void;
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})
const emits = defineEmits<Events>()

const methods = {
  onClick (value: number): void {
    emits('update:value', value)
  }
}
</script>
