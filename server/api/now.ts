import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    now: new Date()
  }
})
