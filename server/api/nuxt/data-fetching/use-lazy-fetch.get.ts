import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  console.log(`[${new Date().toISOString()}] API - useLazyFetch`);

  // Add timeout to simulate.
  await new Promise(resolve => setTimeout(resolve, 0));

  return {
    value: 2,
  };
});
