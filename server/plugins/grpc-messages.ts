import { ServerCredentials } from '@grpc/grpc-js'
import { defineNitroPlugin } from 'nitropack/runtime'

import { getMessagesServer } from '~/utils/grpc/messages'
import { host } from '~/utils/grpc/messages-config'
import { grpcConfiguration } from '~/utils/grpc/grpc-configuration'

export default defineNitroPlugin(async () => {
  if (!grpcConfiguration.enablePlugin) {
    return
  }

  const server = await getMessagesServer()

  server.bindAsync(host, ServerCredentials.createInsecure(), () => console.log(`gRPC listening at ${host}`))
})
