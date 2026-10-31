import { workerConfig } from '../uptime.config'

export const onRequest: PagesFunction = async (context) => {
  const passwordProtection = workerConfig.passwordProtection
  if (passwordProtection) {
    const authHeader = context.request.headers.get('Authorization')
    let authenticated = false
    const expected = 'Basic ' + btoa(passwordProtection)

    if (authHeader && authHeader.length === expected.length) {
      // a simple timing-safe compare
      authenticated = true
      for (let i = 0; i < authHeader.length; i++) {
        if (authHeader[i] !== expected[i]) authenticated = false
      }
    }

    if (!authenticated) {
      return Response.json(
        { code: 401, message: 'Not authenticated' },
        { status: 401, headers: { 'WWW-Authenticate': 'Basic' } }
      )
    }
  }

  return context.next()
}
