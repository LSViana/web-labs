import { ServerCredentials } from '@grpc/grpc-js'
import { defineNitroPlugin } from 'nitropack/runtime'

import { getMessagesServer } from '~/utils/grpc/messages'
import { host } from '~/utils/grpc/messages-config'

const server = getMessagesServer()

export default defineNitroPlugin(() => {
  server.bindAsync(host, ServerCredentials.createInsecure(), () => console.log(`gRPC listening at ${host}`))
})
