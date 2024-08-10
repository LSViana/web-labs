<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div class="p-3">
        <ul class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <li>
            <WlCard>
              <span>Chat</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Servers</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Notebooks</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Papers</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Posts</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Colors</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Inventory</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Newsletter</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Bookmarks</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
          <li>
            <WlCard>
              <span>Budget</span>
              <WlTodoBadge class="ml-2" />
            </WlCard>
          </li>
        </ul>
      </div>
    </WlContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import WlContainer from '~/components/shared/layout/WlContainer.vue'
import WlCard from '~/components/shared/card/WlCard.vue'
import WlTodoBadge from '~/components/shared/badge/WlTodoBadge.vue'
</script>
