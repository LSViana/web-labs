import { defineEventHandler } from 'h3';

import { useToDoStorage } from '~~/layers/to-do/server/services/storage';

const storage = useToDoStorage();

export default defineEventHandler(async () => {
  return await storage.load();
});
