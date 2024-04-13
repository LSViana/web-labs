import { ServerCredentials } from '@grpc/grpc-js'
import { defineNitroPlugin } from 'nitropack/runtime'

import { getMessagesServer } from '~/utils/grpc/messages'

const server = getMessagesServer()

export default defineNitroPlugin(() => {
  const port = parseInt(process.env.NUXT_PORT ?? '3000') + 1
  const host = `0.0.0.0:${port}`

  server.bindAsync(host, ServerCredentials.createInsecure(), () => console.log(`gRPC listening at ${host}`))
})
