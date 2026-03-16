import { createError, defineEventHandler, readBody } from 'h3';

import { useToDoStorage } from '~~/layers/to-do/server/services/storage';

const storage = useToDoStorage();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ text: string }>(event, { strict: true });

    if (!body.text || body.text.trim() === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'text is required',
      });
    }

    const todo = await storage.save(body);
    event.node.res.statusCode = 201;
    return todo;
  }
  catch (error) {
    if (error instanceof Error && error.message === 'todo limit reached') {
      throw createError({
        statusCode: 409,
        statusMessage: 'todo limit reached',
      });
    }
    throw error;
  }
});
