<template>
  <div class="h-32">
    <div ref="box1" class="size-6 rounded border border-amber-400 bg-amber-500" />
    <div ref="box2" class="size-6 rounded border border-purple-400 bg-purple-500" />
    <div ref="box3" class="size-6 rounded border border-green-400 bg-green-500" />
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { onMounted, ref } from 'vue';

const box1 = ref<HTMLElement>();
const box2 = ref<HTMLElement>();
const box3 = ref<HTMLElement>();

async function animateBox1() {
  await gsap.to(box1.value!, { duration: 2, x: 100 });
  await gsap.to(box1.value!, { duration: 2, y: 100 });
  await gsap.to(box1.value!, { duration: 2, rotate: 27 });
  await gsap.to(box1.value!, { duration: 2, x: 0 });
  await gsap.to(box1.value!, { duration: 2, x: 0, y: 0, rotate: 0 });
}

async function animateBox2() {
  await gsap.from(box2.value!, { duration: 2.3, x: 100, repeat: -1, yoyo: true });
}

async function animateBox3() {
  await gsap.set(box3.value!, { x: 100, xPercent: 100 });
}

onMounted(() => {
  animateBox1();
  animateBox2();
  animateBox3();
});
</script>
