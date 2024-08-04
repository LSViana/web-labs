import { ServerCredentials } from '@grpc/grpc-js'
import { defineNitroPlugin } from 'nitropack/runtime'

import { getMessagesServer } from '~/utils/grpc/messages'
import { enablePlugin, host } from '~/utils/grpc/messages-config'

export default defineNitroPlugin(async () => {
  if (!enablePlugin) {
    return
  }

  const server = await getMessagesServer()

  server.bindAsync(host, ServerCredentials.createInsecure(), () => console.log(`gRPC listening at ${host}`))
})
