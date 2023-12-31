<template>
  <NuxtLayout name="home">
    <Container>
      <div class="p-3">
        <p>Get started by choosing a path:</p>
        <ul class="mt-3 grid grid-cols-2 gap-3">
          <li>
            <WlCard to="/experiments">
              Experiments
            </WlCard>
          </li>
          <li>
            <WlCard to="/applications">
              Applications
            </WlCard>
          </li>
        </ul>
      </div>
    </Container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Container from '~/components/shared/layout/Container.vue'
import WlCard from '~/components/shared/card/WlCard.vue'
</script>
