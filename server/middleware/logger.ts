import { defineEventHandler, getRequestPath } from 'h3'

export default defineEventHandler((event) => {
  if (getRequestPath(event).startsWith('/api/now')) {
    console.log('Requested now')
  }
})
