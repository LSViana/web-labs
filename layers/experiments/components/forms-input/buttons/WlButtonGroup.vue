<template>
  <div class="wl-button-group flex flex-nowrap">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.wl-button-group {
  & > :deep(*:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  & > :deep(*:first-child) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  & > :deep(*:last-child) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
