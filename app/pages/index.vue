<template>
  <NuxtLayout name="home">
    <WlContainer>
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
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlCard from '~~/layers/base/components/card/WlCard.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
</script>
