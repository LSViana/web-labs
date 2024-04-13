import grpc, { type ServiceClientConstructor } from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

import type { MessageService } from '~/utils/grpc/messages-types'

const packageDefinition = protoLoader.loadSync(process.cwd() + '/utils/grpc/messages.proto')
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const messageService = protoDescriptor.MessageService as ServiceClientConstructor

let messageReceiptId = 1

export function getMessagesServer(): grpc.Server {
  const server = new grpc.Server()

  server.addService(messageService.service, {
    sendMessage: (call, callback) => {
      callback(
        null,
        {
          id: messageReceiptId++,
          length: call.request.content.length
        })
    }
  } as MessageService)

  return server
}
