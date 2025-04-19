import { defineEventHandler, getCookie, send, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'google_auth_access_token');

  if (!accessToken) {
    setResponseStatus(event, 401);

    return await send(event);
  }

  const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
});
