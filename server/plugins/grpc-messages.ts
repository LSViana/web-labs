import { defineNitroPlugin } from 'nitropack/runtime'

import { getMessagesServer } from '~/utils/grpc/messages'
import { enablePlugin, host } from '~/utils/grpc/messages-config'

export default defineNitroPlugin(async () => {
  if (!enablePlugin) {
    return
  }

  const { ServerCredentials } = await import('@grpc/grpc-js')
  const server = await getMessagesServer()

  server.bindAsync(host, ServerCredentials.createInsecure(), () => console.log(`gRPC listening at ${host}`))
})
