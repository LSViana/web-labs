<template>
  <template v-if="worklogAuth.authenticated.value">
    <div class="flex justify-between">
      <h1 class="text-2xl">Worklog Tracker</h1>
      <a href="#" class="underline" @click="listeners.logout">Logout</a>
    </div>
    <WlWorklogDetailsForm
        :item="item"
        :edit="isEditing"
        @save="listeners.save"
        @remove="listeners.remove"
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
import WlWorklogAuthForm from '~/components/applications/worklog-tracker/WlWorklogAuthForm.vue'
import WlWorklogDetailsForm from '~/components/applications/worklog-tracker/WlWorklogDetailsForm.vue'
import WlWorklogList from '~/components/applications/worklog-tracker/WlWorklogList.vue'
import { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'

useHead({
  title: 'Worklog Tracker'
})

const worklogAuth = useWorklogAuth()
const worklogList = useWorklogList()
const worklogStorage = useWorklogStorage()

onMounted(async () => {
  const items = await worklogStorage.load()
  worklogList.load(items)

  if (worklogList.value.length > 0) {
    item.value.startTime = worklogList.value[worklogList.value.length - 1].endTime
  }
})

const item = ref(new WorklogItem())
const isEditing = ref(false)

const listeners = {
  async save(newItem: WorklogItem): Promise<void> {
    if (isEditing.value) {
      await worklogStorage.update(newItem)
      worklogList.update(newItem)
    } else {
      const savedItem = await worklogStorage.save(newItem)
      worklogList.add(savedItem)
    }

    item.value.startTime = worklogList.value[worklogList.value.length - 1].endTime
    isEditing.value = false
  },
  async remove(): Promise<void> {
    await worklogStorage.remove(item.value)
    worklogList.remove(item.value)
  },
  select(selectedItem: WorklogItem): void {
    item.value = selectedItem
    isEditing.value = true
  },
  login(email: string, password: string): void {
    worklogAuth.login(email, password)
  },
  logout(): void {
    worklogAuth.logout()
  }
}
</script>
