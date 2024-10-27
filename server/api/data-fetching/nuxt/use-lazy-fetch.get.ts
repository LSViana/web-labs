import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  console.log(`[${new Date().toISOString()}] API - useLazyFetch`)

  await new Promise(resolve => setTimeout(resolve, 2000))

  return {
    value: 2
  }
})
