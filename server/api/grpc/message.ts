import protobuf from 'protobufjs'
import { defineEventHandler } from 'h3'

const root = protobuf.loadSync(process.cwd() + '/utils/grpc/messages.proto')
const MessageType = root.lookupType('Message')

interface Message {
  content: string;
}

export default defineEventHandler(() => {
  const messageInstance: Message = {
    content: 'This is a ProtoBuf message.'
  }

  const messagePayload = MessageType.create(messageInstance)
  const encodedPayload = MessageType.encode(messagePayload).finish()
  const decodedPayload = MessageType.decode(encodedPayload)

  const decodedMessageInstance = MessageType.toObject(decodedPayload)

  return decodedMessageInstance
})
