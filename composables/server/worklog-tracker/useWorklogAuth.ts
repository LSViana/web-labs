import { deleteCookie, getCookie, type H3Event, setResponseStatus } from 'h3'
import { setCookie } from 'h3'

const millisecondsPerHour = 1000 * 60 * 60

export function useWorklogAuth() {
  function setCredentials(event: H3Event, credentialsId: string) {
    setCookie(event, 'credentials_id', credentialsId, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + (millisecondsPerHour * 8)),
    })
    setCookie(event, 'authenticated', 'true', { secure: true })
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
