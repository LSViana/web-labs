import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  console.log(`[${new Date().toISOString()}] API - useFetch`);

  return {
    value: 2,
  };
});
