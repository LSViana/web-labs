<template>
  <NuxtLayout name="home">
    <Container class="flex flex-col gap-3 p-3">
      <p>The shared text input:</p>
      <ExperimentCanvas>
        <input v-model="value" type="text" class="rounded border bg-slate-200 px-2 py-1 outline-0 dark:bg-slate-800" @input="listeners.input">
        <template #caption>
          Synchronized via Supabase. <span class="cursor-pointer underline" @click="listeners.clickUpdateServer">Update from server</span>.
        </template>
      </ExperimentCanvas>
    </Container>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'

import Container from '~/components/shared/layout/Container.vue'
import ExperimentCanvas from '~/components/shared/experiments/ExperimentCanvas.vue'

import { useSupabaseClient } from '~/composables/rtc/supabase'

const supabase = useSupabaseClient()
const value = ref('')

if (supabase?.client) {
  supabase.channel
    .on('broadcast', { event: 'value' }, (event) => {
      value.value = event.value as string
    })

  onUnmounted(() => {
    supabase.client.realtime.removeChannel(supabase.channel)
  })
}

const listeners = {
  input(event: Event): void {
    const value = (event.target as HTMLInputElement).value

    if (supabase?.channel) {
      supabase.channel.send({
        type: 'broadcast',
        event: 'value',
        value
      })
    }
  },
  async clickUpdateServer(): Promise<void> {
    await fetch('/api/rtc/supabase/update')
  }
}
</script>
