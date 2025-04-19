import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  const now = new Date();

  return {
    date: now,
    formattedDate: now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    }).replace(/\//g, '/'),
    formattedTime: now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
    }),
  };
});
