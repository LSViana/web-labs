import { defineEventHandler } from 'h3';

import { useProductivityAuth } from '~~/server/services/productivity/auth';

export default defineEventHandler(async (event) => {
  const auth = useProductivityAuth();

  auth.removeCredentials(event);
});
