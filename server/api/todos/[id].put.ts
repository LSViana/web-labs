import { createError, defineEventHandler, getRouterParam, readBody } from 'h3';

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

  try {
    const body = await readBody<{ text?: string; done?: boolean }>(event, { strict: true });

    const todo = await storage.update(id, body);
    return todo;
  }
  catch (error) {
    if (error instanceof Error && error.message === 'todo not found') {
      throw createError({
        statusCode: 404,
        statusMessage: 'todo not found',
      });
    }
    throw error;
  }
});
