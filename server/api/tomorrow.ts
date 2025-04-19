import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
  }
})
