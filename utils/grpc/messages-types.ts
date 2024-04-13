import type { handleUnaryCall } from '@grpc/grpc-js'

export type Message = {
  content: string;
}

export type MessageReceipt = {
  id: number;
  length: number;
}

export type MessageService = {
  sendMessage: handleUnaryCall<Message, MessageReceipt>;
}
