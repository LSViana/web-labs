<template>
  <NuxtLayout name="home">
    <WlContainer>
      <div class="p-3">
        <ul class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <li>
            <WlCard to="/applications/pomodoro">
              <span>Pomodoro</span>
            </WlCard>
          </li>
          <li>
            <WlCard to="/applications/worklog-tracker">
              <span>Worklog Tracker</span>
            </WlCard>
          </li>
          <li>
            <WlCard to="/applications/to-do">
              <span>To Do</span>
            </WlCard>
          </li>
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
import WlCard from '~~/layers/base/components/layout/WlCard.vue';
import WlContainer from '~~/layers/base/components/layout/WlContainer.vue';
import WlTodoBadge from '~~/layers/experiments/components/forms-input/badge/WlTodoBadge.vue';
</script>
