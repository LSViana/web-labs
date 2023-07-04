import { defineEventHandler, getQuery, getRequestPath, send, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  if (getRequestPath(event).startsWith('/api/tomorrow')) {
    if (!getQuery(event).auth) {
      setResponseStatus(event, 401)

      await send(event)
    }
  }
})
