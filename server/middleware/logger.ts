import { defineEventHandler, getRequestPath } from 'h3'

export default defineEventHandler((event) => {
  if (getRequestPath(event).startsWith('/api/now')) {
    // eslint-disable-next-line no-console
    console.log('Requested now')
  }
})
