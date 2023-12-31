<template>
  <div />
</template>

<style lang="scss" scoped>
div {
  width: 300px;
  height: 300px;
  filter: contrast(500%) brightness(150%);
  background-image:
      linear-gradient(to bottom right,
        rgba(blue, 70%),
        rgba(green, 70%),
        rgba(#dcdc00, 70%)
      ),
      url('/img/noise-filter.svg');
  background-blend-mode: difference;
  background-size: cover;
  background-color: white;
}
</style>
