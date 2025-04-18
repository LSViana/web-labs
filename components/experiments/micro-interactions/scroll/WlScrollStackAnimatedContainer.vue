<template>
  <div class="relative flex gap-3 overflow-x-scroll p-3 [&>*]:sticky [&>*]:left-0" @scroll.passive="listeners.scroll">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const scrolledClass = 'scrolled'
const overScrolledClass = 'overscrolled'
const childrenClasses = ['transition-transform', 'origin-left', 'duration-500']

const listeners = {
  scroll(event: Event): void {
    const target = event.target as HTMLElement

    const scrollLeft = target.scrollLeft
    let scrollIndex = -1

    for (let i = target.children.length - 1; i >= 0; i--) {
      const child = target.children[i] as HTMLElement
      child.classList.add(...childrenClasses)

      if (i === 0) {
        break
      }

      const previousChild = target.children[i - 1] as HTMLElement
      const offset = scrollLeft - child.offsetLeft
      const scrolled = offset > (-previousChild.clientWidth / 2)

      if (scrollLeft > 0 && scrolled) {
        scrollIndex = i
        break
      }
    }

    for (let i = 0; i < target.children.length; i++) {
      const child = target.children[i] as HTMLElement
      const scrolled = i < scrollIndex
      const overScrolled = i + 1 < scrollIndex

      child.classList.remove(overScrolledClass)
      child.classList.remove(scrolledClass)

      if (overScrolled) {
        child.classList.add(overScrolledClass)
      }
      else if (scrolled) {
        child.classList.add(scrolledClass)
      }
    }
  },
}
</script>

<style lang="scss">
.scrolled {
  transform: translateX(-0.4rem) scale(0.95);
}

.overscrolled {
  transform: translateX(-0.7rem) scale(0.9);
}
</style>
