import grpc, { type ServiceClientConstructor } from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

import type { MessageService } from '~/utils/grpc/messages-types'

const packageDefinition = protoLoader.loadSync(process.cwd() + '/utils/grpc/messages.proto')
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

let messageReceiptId = 1

export const Service = protoDescriptor.MessageService as ServiceClientConstructor
export function getMessagesServer(): grpc.Server {
  const server = new grpc.Server()

  const handlers: MessageService = {
    sendMessage: (call, callback) => {
      callback(
        null,
        {
          id: messageReceiptId++,
          length: call.request.content.length
        })
    },
    sendMessageStream: (call, callback) => {
      // TODO: Implement the handler.
    },
    readMessageStream: (call) => {
      // TODO: Implement the handler.
    }
  }

  server.addService(Service.service, handlers)

  return server
}
