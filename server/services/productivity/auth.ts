import { deleteCookie, getCookie, type H3Event, setResponseStatus } from 'h3'
import { setCookie } from 'h3'

const millisecondsPerHour = 1000 * 60 * 60
const millisecondsPerDay = millisecondsPerHour * 24
const millisecondsPerWeek = millisecondsPerDay * 7

export function useProductivityAuth() {
  function setCredentials(event: H3Event, credentialsId: string) {
    const expires = new Date(Date.now() + millisecondsPerWeek)

    setCookie(event, 'credentials_id', credentialsId, {
      httpOnly: true,
      secure: true,
      expires: expires,
    })
    setCookie(event, 'authenticated', 'true', {
      httpOnly: false, // Must be accessible from JavaScript to show the auth state.
      secure: true,
      expires: expires,
    })
  }

  function removeCredentials(event: H3Event) {
    deleteCookie(event, 'credentials_id', { secure: true })
    deleteCookie(event, 'authenticated', { secure: true })
  }

  function getCredentials(event: H3Event): string {
    const credentialsId = getCookie(event, 'credentials_id')

    if (!credentialsId) {
      setResponseStatus(event, 401)

      throw new Error('Authentication required')
    }

    return credentialsId
  }

  return {
    setCredentials,
    removeCredentials,
    getCredentials
  }
}
