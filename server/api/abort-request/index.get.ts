import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  console.log('Abort request - start')

  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log('Abort request - end')

  return {
    result: 42
  }
})
