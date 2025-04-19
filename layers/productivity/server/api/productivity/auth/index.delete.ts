import { defineEventHandler } from 'h3';

import { useProductivityAuth } from '~~/layers/productivity/server/services/auth';

export default defineEventHandler(async (event) => {
  const auth = useProductivityAuth();

  auth.removeCredentials(event);
});
