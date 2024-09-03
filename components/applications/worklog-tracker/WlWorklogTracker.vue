<template>
  <template v-if="worklogAuth.authenticated.value">
    <div class="flex justify-between">
      <h1 class="text-2xl">Worklog Tracker</h1>
      <div class="flex items-center gap-3">
        <WlDateInput v-model="date" @change="listeners.updateDate"/>
        <a href="#" class="underline" @click="listeners.logout">Logout</a>
      </div>
    </div>
    <WlWorklogDetailsForm
        :item="item"
        :edit="isEditing"
        @save="listeners.save"
        @remove="listeners.remove"
        @close="listeners.close"
    />
    <WlWorklogList :items="worklogList.value" @select="listeners.select"/>
  </template>
  <WlWorklogAuthForm v-else @login="listeners.login"/>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'

import { useWorklogAuth } from '~/components/applications/worklog-tracker/useWorklogAuth'
import { useWorklogList } from '~/components/applications/worklog-tracker/useWorklogList'
import { useWorklogStorage } from '~/components/applications/worklog-tracker/useWorklogStorage'
import { useWorklogToday } from '~/components/applications/worklog-tracker/useWorklogToday'
import WlWorklogAuthForm from '~/components/applications/worklog-tracker/WlWorklogAuthForm.vue'
import WlWorklogDetailsForm from '~/components/applications/worklog-tracker/WlWorklogDetailsForm.vue'
import WlWorklogList from '~/components/applications/worklog-tracker/WlWorklogList.vue'
import WlDateInput from '~/components/experiments/forms-input/input/WlDateInput.vue'
import { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'

useHead({
  title: 'Worklog Tracker'
})

const worklogAuth = useWorklogAuth()
const worklogList = useWorklogList()
const worklogStorage = useWorklogStorage()
const worklogToday = useWorklogToday()

onMounted(() => methods.loadWorklogs())

const item = ref(new WorklogItem())
const isEditing = ref(false)
const date = ref(worklogToday.get())

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
    } else {
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
    isEditing.value = false

    if (worklogList.value.length > 0) {
      item.value.startTime = worklogList.value[worklogList.value.length - 1].endTime
    }
  },
  select(selectedItem: WorklogItem): void {
    item.value = selectedItem
    isEditing.value = true
  },
  async login(email: string, password: string): Promise<void> {
    await worklogAuth.login(email, password)
    await methods.loadWorklogs()
  },
  logout(): void {
    worklogAuth.logout()
  }
}

const methods = {
  async loadWorklogs(): Promise<void> {
    const items = await worklogStorage.load(date.value)
    worklogList.load(items)

    if (worklogList.value.length > 0) {
      item.value.startTime = worklogList.value[worklogList.value.length - 1].endTime
    }
  }
}
</script>
