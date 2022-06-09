import { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../logger'
import loginHandler from './authActions/login'
import logoutHandler from './authActions/logout'
import userHandler from './authActions/user'
import { AuthOptions, NextractRequest } from 'api/types'
import { withIronSessionApiRoute } from 'iron-session/next'

const authHandler = async (req: NextractRequest, res: NextApiResponse) => {
  // Get auth action from query -> /api/nextract/auth/<auth_action>
  const { nextract, authAction = nextract[nextract.length - 1] } = req.query

  // If no auth action is specified, we can't do anything and return an error
  if (!authAction) {
    return res.status(400).json({ success: false, message: 'No auth action provided.' })
  }

  const authOptions = req.options.authOptions
  const users = authOptions?.users

  if (users !== undefined && users.length === 0) {
    // When an empty array of users is provided, we assume it to be a mistake of the developer and warn them
    logger.warn(
      'NO_USERS_ERROR',
      `No users are configured for authentication. To disable authentication, don't configure authOptions.`,
    )
    return res.status(401).json({
      success: false,
      message: 'Invalid username/password combination.',
    })
  }

  if (users === undefined || authOptions === undefined) {
    return res.status(200).json({
      success: true,
      message: 'Nextract.js stats are public. You can use the API without authentication.',
    })
  }

  switch (authAction) {
    case 'login':
      return await loginHandler(req, res, authOptions)
    case 'logout':
      return await logoutHandler(req, res, authOptions)
    case 'user':
      return await userHandler(req, res, authOptions)
    default: {
      return res.status(404).json({
        success: false,
        message: `Error: Invalid auth route /${authAction}.`,
      })
    }
  }
}

const withAuthApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  options: AuthOptions,
  handler: (req: NextApiRequest, res: NextApiResponse) => any,
) => {
  if (!options.cookie?.password) {
    logger.error('NO_COOKIE_PASSWORD', `No cookie password is configured.`)
    return res.status(500).json({
      success: false,
      message: 'No password configured for cookie.',
    })
  }

  const ironSessionOptions = {
    cookieName: options.cookie?.name ?? 'nextract/session',
    password: options.cookie?.password,
    ttl: options.cookie?.ttl ?? 86400,
    cookieOptions: {
      ...options.cookie?.options,
      secure: options.cookie?.options?.secure ?? process.env.NODE_ENV === 'production', // Only set secure to true in production or if the user explicitly sets it to true
    },
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')

  return withIronSessionApiRoute(handler, ironSessionOptions)(req, res)
}

export { withAuthApi }

export default {
  action: 'auth',
  handler: authHandler,
}
