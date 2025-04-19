import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  console.log(`[${new Date().toISOString()}] API - $fetch`)

  return {
    value: 1,
  }
})
