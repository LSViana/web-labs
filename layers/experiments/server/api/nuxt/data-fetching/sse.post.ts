import { createEventStream, defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  let count = 0;

  const interval = setInterval(() => {
    if (count === 10) {
      clearInterval(interval);

      eventStream.close();
    }

    return eventStream.push(`Message @ ${count++}`);
  }, 1000);

  eventStream.onClosed(async () => {
    clearInterval(interval);

    await eventStream.close();
  });

  // This is needed to start the event stream.
  return eventStream.send();
});
