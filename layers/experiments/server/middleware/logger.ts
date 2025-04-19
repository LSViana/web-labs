import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  if (event.path.startsWith('/api/now')) {
    console.log('Requested /api/now');
  }
});
