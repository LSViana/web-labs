import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    date: new Date()
  }
})
