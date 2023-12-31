<template>
  <div class="wl-sda-root relative">
    <div class="wl-sda-progress absolute h-1 w-full bg-amber-500" />
    <div class="wl-sda flex gap-3 overflow-x-scroll py-3">
      <div
        v-for="i in 10"
        :key="i"
        class="h-32 w-32 shrink-0 rounded border bg-slate-200 dark:bg-slate-800"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes sda-progress {
  from {
    background-color: theme('colors.red.500');
    width: 0;
  }

  to {
    background-color: theme('colors.amber.500');
    width: 100%;
  }
}

.wl-sda-root {
  timeline-scope: --wl-sda;
}

.wl-sda {
  scroll-timeline: --wl-sda inline;
}

.wl-sda-progress {
  animation: sda-progress linear;
  animation-timeline: --wl-sda;
}
</style>
