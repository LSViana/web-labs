import { defineEventHandler, readBody } from 'h3';

import { usePomodoroStorage } from '~~/layers/pomodoro/server/services/storage';
import type { PomodoroRecord } from '~~/layers/pomodoro/shared/types/pomodoroRecord';
import { useProductivityAuth } from '~~/layers/productivity/server/services/auth';

const storage = usePomodoroStorage();

export default defineEventHandler(async (event) => {
  const pomodoroRecord = await readBody<PomodoroRecord>(event, { strict: true });

  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  return await storage.save(pomodoroRecord, credentialsId);
});
