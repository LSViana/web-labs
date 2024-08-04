import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

import { googleAuthConfiguration } from '~/components/experiments/authentication/google-auth-configuration'

export default defineEventHandler(async (event) => {
  const requestURL = getRequestURL(event)
  const redirectURI = `${requestURL.protocol}//${requestURL.host}/api/auth/google/token`

  const targetURL = new URL(googleAuthConfiguration.loginEndpoint)

  targetURL.searchParams.set('client_id', googleAuthConfiguration.clientId)
  targetURL.searchParams.set('redirect_uri', redirectURI)
  targetURL.searchParams.set('response_type', 'code')
  targetURL.searchParams.set('scope', 'openid')
  targetURL.searchParams.set('access_type', 'online')
  targetURL.searchParams.set('state', 'web-labs-are-awesome')

  await sendRedirect(event, targetURL.toString())
})
