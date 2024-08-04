import type { Server, ServiceClientConstructor } from '@grpc/grpc-js'
import type { MessageService } from '~/utils/grpc/messages-types'

export async function getMessagesServer(): Promise<Server> {
  const grpc = await import('@grpc/grpc-js')
  const protoLoader = await import('@grpc/proto-loader')

  const server = new grpc.Server()

  const packageDefinition = protoLoader.loadSync(process.cwd() + '/utils/grpc/messages.proto')
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

  let messageReceiptId = 1

  const Service = protoDescriptor.MessageService as ServiceClientConstructor

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
