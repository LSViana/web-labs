<template>
  <div class="flex items-center justify-between">
    <h1 class="text-xl">
      Worklog Tracker
    </h1>
    <div class="flex items-center gap-3">
      <WlDateInput v-model="date" @change="listeners.updateDate" />
      <a href="#" class="underline" @click="listeners.logout">Logout</a>
    </div>
  </div>
  <WlWorklogDetailsForm
    :item="item"
    :edit="isEditing"
    :disabled="worklogStorage.operationLoading.value"
    @save="listeners.save"
    @remove="listeners.remove"
    @close="listeners.close"
  />
  <WlWorklogList :selected-index="selectedIndex" :items="worklogList.value" @select="listeners.select" />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { onMounted, ref } from 'vue';

import { useRouter } from '#app';
import WlDateInput from '~~/layers/experiments/components/forms-input/input/WlDateInput.vue';
import { useProductivityAuth } from '~~/layers/productivity/composables/useProductivityAuth';
import WlWorklogDetailsForm from '~~/layers/worklog-tracker/components/WlWorklogDetailsForm.vue';
import WlWorklogList from '~~/layers/worklog-tracker/components/WlWorklogList.vue';
import { useWorklogList } from '~~/layers/worklog-tracker/composables/useWorklogList';
import { useWorklogStorage } from '~~/layers/worklog-tracker/composables/useWorklogStorage';
import { useWorklogToday } from '~~/layers/worklog-tracker/composables/useWorklogToday';
import { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';

useHead({
  title: 'Worklog Tracker',
});

const router = useRouter();

const auth = useProductivityAuth();

const worklogList = useWorklogList();
const worklogStorage = useWorklogStorage();
const worklogToday = useWorklogToday();

onMounted(() => methods.loadWorklogs());

const item = ref(new WorklogItem());
const isEditing = ref(false);
const date = ref(worklogToday.get());
const selectedIndex = ref(-1);

const listeners = {
  updateDate(): void {
    methods.loadWorklogs();
  },
  async save(newItem: WorklogItem): Promise<void> {
    newItem.startTime.setFullYear(date.value.getFullYear(), date.value.getMonth(), date.value.getDate());
    newItem.endTime.setFullYear(date.value.getFullYear(), date.value.getMonth(), date.value.getDate());

    if (isEditing.value) {
      const originalItem = worklogList.value[selectedIndex.value];

      try {
        worklogList.update(newItem);
        await worklogStorage.update(newItem);
      }
      catch (error) {
        if (originalItem) {
          worklogList.update(originalItem);
        }

        console.error('Failed to update worklog item:', error);
      }
    }
    else {
      const result = worklogStorage.save(newItem);

      try {
        worklogList.add(result.optimisticValue);

        const savedItem = await result.confirmedValue;
        worklogList.replaceById(result.optimisticValue.id, savedItem);
      }
      catch (error) {
        worklogList.removeById(result.optimisticValue.id);
        console.error('Failed to save worklog item:', error);

        return;
      }
    }

    listeners.close();
  },
  async remove(): Promise<void> {
    const itemToRemove = item.value;

    try {
      worklogList.remove(itemToRemove);
      await worklogStorage.remove(itemToRemove);
    }
    catch (error) {
      worklogList.add(itemToRemove);
      console.error('Failed to remove worklog item:', error);

      return;
    }

    listeners.close();
  },
  close(): void {
    item.value = new WorklogItem();
    selectedIndex.value = -1;
    isEditing.value = false;

    if (worklogList.value[0]) {
      item.value.startTime = worklogList.value[0].endTime;
    }

    item.value.endTime = item.value.startTime;
  },
  select(index: number): void {
    if (!worklogList.value[index]) {
      return;
    }

    item.value = worklogList.value[index];
    selectedIndex.value = index;
    isEditing.value = true;
  },
  async logout(): Promise<void> {
    await auth.logout();
    await router.push('/applications/worklog-tracker/login');
  },
};

const methods = {
  async loadWorklogs(): Promise<void> {
    const items = await worklogStorage.load(date.value);
    worklogList.load(items);

    if (worklogList.value[0]) {
      const newValue = new WorklogItem();
      newValue.startTime = worklogList.value[0].endTime;
      newValue.endTime = newValue.startTime;
      item.value = newValue;
    }
  },
};
</script>
