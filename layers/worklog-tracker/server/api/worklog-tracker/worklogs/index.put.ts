import { defineEventHandler, readBody } from 'h3';

import { useProductivityAuth } from '~~/layers/productivity/server/services/auth';
import { useWorklogStorage } from '~~/layers/worklog-tracker/server/services/storage';
import type { WorklogItemDto } from '~~/layers/worklog-tracker/types/transfer/worklogItemDto';

const storage = useWorklogStorage();

export default defineEventHandler(async (event) => {
  const worklogItem = await readBody<WorklogItemDto>(event, { strict: true });

  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  return await storage.update(worklogItem, credentialsId);
});
