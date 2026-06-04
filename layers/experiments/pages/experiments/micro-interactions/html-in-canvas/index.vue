<template>
  <NuxtLayout name="home">
    <WlContainer class="flex flex-col gap-3 p-3">
      <p>The HTML-in-Canvas experiment:</p>
      <WlExperimentCanvas>
        <canvas class="border rounded" ref="canvas" layoutsubtree>
          <div
              ref="target"
              class="border border-2 bg-white border border-blue-700 text-blue-700 shadow-md py-3 px-7 rounded"
          >
            São Paulo, Brasil
          </div>
        </canvas>
      </WlExperimentCanvas>
    </WlContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue'
import WlExperimentCanvas from '~~/layers/experiments/components/experiments/WlExperimentCanvas.vue'
import { onMounted, onUnmounted, ref } from 'vue'

let animationFrameId = -1
const canvas = ref<HTMLCanvasElement>()
const target = ref<HTMLElement>()

onMounted(() => {
  if (!canvas.value || !target.value) {
    return
  }

  const context = canvas.value.getContext('2d')

  if (!context) {
    return
  }

  canvas.value.addEventListener('paint', (event) => {
    const canvasElement = canvas.value!
    const targetElement = target.value!

    const centerX = canvasElement.width / 2
    const centerY = canvasElement.height / 2

    context.clearRect(0, 0, canvasElement.width, canvasElement.height)
    const targetTransform = context.drawElementImage(
        targetElement,
        centerX - (targetElement.clientWidth / 2),
        centerY - (targetElement.clientHeight / 2))

    targetElement.style.transform = targetTransform
  })

  animationFrameId = requestAnimationFrame(() => {
    canvas.value?.requestPaint()
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})
</script>
