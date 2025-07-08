import { defineEventHandler, getQuery } from 'h3';

import { usePomodoroStorage } from '~~/layers/pomodoro/server/services/storage';
import { useProductivityAuth } from '~~/layers/productivity/server/services/auth';

const storage = usePomodoroStorage();

export default defineEventHandler(async (event) => {
  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  const query = getQuery(event);
  let rawDate = query.date?.toString();

  if (!rawDate) {
    rawDate = new Date().toISOString();
  }

  return await storage.load(credentialsId, new Date(rawDate));
});
