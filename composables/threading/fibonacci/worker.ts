import fibonacci from '~/composables/threading/fibonacci/fibonacci'

onmessage = (message): void => {
  const result = fibonacci(message.data as number)

  postMessage(result)
}
