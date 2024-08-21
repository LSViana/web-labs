import * as fs from 'fs'
import { defineEventHandler, send, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  await fs.writeFile('server/api/files/name', 'Lucas Viana', () => {})

  setResponseStatus(event, 200)
  await send(event)
})
