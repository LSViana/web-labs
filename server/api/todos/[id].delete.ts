import { createError, defineEventHandler, getRouterParam } from 'h3';

import { useToDoStorage } from '~~/layers/to-do/server/services/storage';

const storage = useToDoStorage();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'id is required',
    });
  }

  await storage.remove(id);
  event.node.res.statusCode = 204;
});
