import { defineEventHandler, getQuery } from 'h3';

import { useProductivityAuth } from '~~/server/services/productivity/auth';
import { useWorklogStorage } from '~~/server/services/worklog/storage';

const storage = useWorklogStorage();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const issueId = query.issueId;
  const worklogId = query.worklogId;

  if (typeof issueId !== 'string' || typeof worklogId !== 'string'
    || issueId.trim().length === 0 || worklogId.trim().length === 0) {
    throw new Error('Invalid query');
  }

  const auth = useProductivityAuth();
  const credentialsId = auth.getCredentials(event);

  await storage.remove(issueId, worklogId, credentialsId);

  return {
    status: 204,
    valid: query,
  };
});
