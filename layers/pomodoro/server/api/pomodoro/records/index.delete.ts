import { defineEventHandler, getQuery } from 'h3';

import { usePomodoroStorage } from '~~/layers/pomodoro/server/services/storage';
import { useProductivityAuth } from '~~/layers/productivity/server/services/auth';

const storage = usePomodoroStorage();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;

  if (typeof id !== 'string' || id.trim().length === 0) {
    throw new Error('Invalid query');
  }

  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  await storage.remove(id, credentialsId);

  return {
    status: 204,
    valid: query,
  };
});
