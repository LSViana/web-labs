import { defineEventHandler, readBody } from 'h3';

import { usePomodoroStorage } from '~~/layers/pomodoro/server/services/storage';
import type { PomodoroRecordDto } from '~~/layers/pomodoro/types/transfer/pomodoroRecordDto';
import { useProductivityAuth } from '~~/layers/productivity/server/services/auth';

const storage = usePomodoroStorage();

export default defineEventHandler(async (event) => {
  const pomodoroRecord = await readBody<PomodoroRecordDto>(event, { strict: true });

  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  await storage.update(pomodoroRecord, credentialsId);
});
