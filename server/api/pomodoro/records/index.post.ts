import { defineEventHandler, readBody } from 'h3';

import type { PomodoroRecord } from '~~/layers/pomodoro/shared/types/pomodoroRecord';
import { usePomodoroStorage } from '~~/server/services/pomodoro/storage';
import { useProductivityAuth } from '~~/server/services/productivity/auth';

const storage = usePomodoroStorage();

export default defineEventHandler(async (event) => {
  const pomodoroRecord = await readBody<PomodoroRecord>(event, { strict: true });

  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  return await storage.save(pomodoroRecord, credentialsId);
});
