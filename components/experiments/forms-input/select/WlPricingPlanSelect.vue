<template>
  <div class="flex flex-col gap-3">
    <div
        v-for="(plan, index) in plans"
        :key="plan.name"
        class="w-72 cursor-pointer rounded border px-3 py-2 transition-[background-color,border-color,color]"
        :class="methods.getPlanClasses(index)"
        @click="listeners.onClick(index)"
    >
      <div class="flex items-center justify-between">
        <span class="font-bold">{{ plan.name }}</span>
        <WlCheckIcon class="transition-opacity" :class="methods.getPlanCheckIconClasses(index)"/>
      </div>
      <div class="flex items-end justify-between">
        <ul class="text-sm">
          <li>{{ plan.features.users }} users</li>
          <li>{{ plan.features.storageGb }} GB of storage</li>
        </ul>
        <span><small>US$</small> <span class="font-bold">{{ plan.priceMonthly }}</span><small>/month</small></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { readonly } from 'vue'

import WlCheckIcon from '~/components/shared/icons/static/WlCheckIcon.vue'

type Props = {
  value: number;
};
type Events = {
  (e: 'update:value', value: number): void;
};

type Plan = {
  name: string;
  priceMonthly: number;
  features: {
    users: number;
    storageGb: number;
  };
};

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const plans = readonly<Plan[]>([
  {
    name: 'Basic',
    priceMonthly: 10,
    features: {
      users: 1,
      storageGb: 10
    }
  },
  {
    name: 'Team',
    priceMonthly: 30,
    features: {
      users: 3,
      storageGb: 50
    }
  },
  {
    name: 'Enterprise',
    priceMonthly: 60,
    features: {
      users: 15,
      storageGb: 200
    }
  }
])

const listeners = {
  onClick (index: number): void {
    emits('update:value', index)
  }
}

const methods = {
  isPlanActive (index: number): boolean {
    return index === props.value
  },
  getPlanClasses (index: number): string {
    return methods.isPlanActive(index)
        ? 'bg-green-800 text-green-100 border-green-400'
        : 'bg-slate-800'
  },
  getPlanCheckIconClasses (index: number): string {
    return methods.isPlanActive(index)
        ? 'opacity-100'
        : 'opacity-0'
  }
}
</script>
