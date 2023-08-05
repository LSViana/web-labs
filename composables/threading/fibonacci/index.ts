import fibonacci from '~/composables/threading/fibonacci/fibonacci'

type FibonacciResult = {
  calculate(iterations: number): number;
  calculateAsync(iterations: number): Promise<number>;
};

function useFibonacci (): FibonacciResult {
  return {
    calculate (iterations: number): number {
      return fibonacci(iterations)
    },
    calculateAsync (iterations: number): Promise<number> {
      return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./worker.ts', import.meta.url), {
          type: 'module'
        })

        worker.postMessage(iterations)

        worker.onmessage = (message): void => {
          resolve(message.data as number)
          worker.terminate()
        }

        worker.onerror = (error): void => {
          reject(error)

          worker.terminate()
        }
      })
    }
  }
}

export default useFibonacci
