import { defineEventHandler, deleteCookie, getRequestURL, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'google_auth');
  deleteCookie(event, 'google_auth_access_token');

  const requestURL = getRequestURL(event);
  const redirectURI = `${requestURL.protocol}//${requestURL.host}/experiments/authentication/third-party-login`;

  return await sendRedirect(event, redirectURI);
});
