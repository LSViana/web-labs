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
import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'

import { useRouter } from '#app'
import { useWorklogList } from '~/components/applications/worklog-tracker/useWorklogList'
import { useWorklogStorage } from '~/components/applications/worklog-tracker/useWorklogStorage'
import { useWorklogToday } from '~/components/applications/worklog-tracker/useWorklogToday'
import WlWorklogDetailsForm from '~/components/applications/worklog-tracker/WlWorklogDetailsForm.vue'
import WlWorklogList from '~/components/applications/worklog-tracker/WlWorklogList.vue'
import WlDateInput from '~/components/experiments/forms-input/input/WlDateInput.vue'
import { useProductivityAuth } from '~/composables/productivity/useProductivityAuth'
import { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'

useHead({
  title: 'Worklog Tracker',
})

const router = useRouter()

const auth = useProductivityAuth()

const worklogList = useWorklogList()
const worklogStorage = useWorklogStorage()
const worklogToday = useWorklogToday()

onMounted(() => methods.loadWorklogs())

const item = ref(new WorklogItem())
const isEditing = ref(false)
const date = ref(worklogToday.get())
const selectedIndex = ref(-1)

const listeners = {
  updateDate(): void {
    methods.loadWorklogs()
  },
  async save(newItem: WorklogItem): Promise<void> {
    newItem.startTime.setFullYear(date.value.getFullYear(), date.value.getMonth(), date.value.getDate())
    newItem.endTime.setFullYear(date.value.getFullYear(), date.value.getMonth(), date.value.getDate())

    if (isEditing.value) {
      await worklogStorage.update(newItem)
      worklogList.update(newItem)
    }
    else {
      const savedItem = await worklogStorage.save(newItem)
      worklogList.add(savedItem)
    }

    listeners.close()
  },
  async remove(): Promise<void> {
    await worklogStorage.remove(item.value)
    worklogList.remove(item.value)

    listeners.close()
  },
  close(): void {
    item.value = new WorklogItem()
    selectedIndex.value = -1
    isEditing.value = false

    if (worklogList.value[0]) {
      item.value.startTime = worklogList.value[0].endTime
    }

    item.value.endTime = item.value.startTime
  },
  select(index: number): void {
    if (!worklogList.value[index]) {
      return
    }

    item.value = worklogList.value[index]
    selectedIndex.value = index
    isEditing.value = true
  },
  async logout(): Promise<void> {
    await auth.logout()
    await router.push('/applications/worklog-tracker/login')
  },
}

const methods = {
  async loadWorklogs(): Promise<void> {
    const items = await worklogStorage.load(date.value)
    worklogList.load(items)

    if (worklogList.value[0]) {
      const newValue = new WorklogItem()
      newValue.startTime = worklogList.value[0].endTime
      newValue.endTime = newValue.startTime
      item.value = newValue
    }
  },
}
</script>
