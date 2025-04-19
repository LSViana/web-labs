import { defineEventHandler, getQuery, getRequestURL, sendRedirect, setCookie } from 'h3'
import { isDevelopment } from 'std-env'

import { googleAuthConfiguration } from '~/components/experiments/authentication/google-auth-configuration'

export default defineEventHandler(async (event) => {
  const requestURL = getRequestURL(event)
  const redirectURI = `${requestURL.protocol}//${requestURL.host}/api/auth/google/token`

  const query = getQuery(event)
  const code = query.code as string

  const targetURL = new URL(googleAuthConfiguration.tokenEndpoint)
  const targetForm = new FormData()

  targetForm.set('code', code)
  targetForm.set('client_id', googleAuthConfiguration.clientId)
  targetForm.set('client_secret', googleAuthConfiguration.clientSecret)
  targetForm.set('redirect_uri', redirectURI)
  targetForm.set('grant_type', 'authorization_code')

  const response = await fetch(targetURL, {
    body: targetForm,
    method: 'POST',
  })

  const responseData = await response.json()

  const cookieExpiration = new Date(new Date().getTime() + 1000 * 60 * 60) // 1 hour ahead

  setCookie(event, 'google_auth', 'true', {
    secure: !isDevelopment,
    expires: cookieExpiration,
  })
  setCookie(event, 'google_auth_access_token', responseData.access_token, {
    httpOnly: true,
    secure: !isDevelopment,
    expires: cookieExpiration,
  })

  return sendRedirect(event, '/experiments/authentication/third-party-login')
})
