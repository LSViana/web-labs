import { defineEventHandler, readBody } from 'h3';

import type { WorklogItem } from '~~/layers/worklog-tracker/shared/types/worklogItem';
import { useProductivityAuth } from '~~/server/services/productivity/auth';
import { useWorklogStorage } from '~~/server/services/worklog/storage';

const storage = useWorklogStorage();

export default defineEventHandler(async (event) => {
  const worklogItem = await readBody<WorklogItem>(event, { strict: true });

  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  return await storage.save(worklogItem, credentialsId);
});
