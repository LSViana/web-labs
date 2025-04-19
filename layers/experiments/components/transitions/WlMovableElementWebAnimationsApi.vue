<template>
  <div class="relative m-3 h-[150px] bg-gray-500/10" @click="listeners.click">
    <div ref="target" class="inline-block size-8 rounded-full bg-red-500" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports';

const target = ref<HTMLElement>();

const listeners = {
  click(event: MouseEvent): void {
    methods.setPosition(event.offsetX, event.offsetY);
  },
};

const methods = {
  setPosition(x: number, y: number): void {
    if (!target.value?.animate) {
      return;
    }

    const previousAnimation = target.value.getAnimations().slice(-1)[0];

    if (previousAnimation) {
      previousAnimation.commitStyles();
    }

    const initialTransform = target.value.style.transform ?? 'translate(0px, 0px)';

    const keyframes: Keyframe[] = [
      { transform: initialTransform },
      { transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` },
    ];
    const timing: KeyframeAnimationOptions = {
      duration: 500,
      iterations: 1,
      fill: 'forwards',
      easing: 'ease-in-out',
    };

    target.value?.animate(keyframes, timing);
  },
};
</script>
