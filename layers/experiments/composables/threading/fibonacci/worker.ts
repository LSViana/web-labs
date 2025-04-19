import fibonacci from '~~/layers/experiments/composables/threading/fibonacci/fibonacci';

onmessage = (message): void => {
  const result = fibonacci(message.data as number);

  postMessage(result);
};
