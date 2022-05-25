import { NextractRequest } from 'api/types'
import { Database, DatabaseAction } from '../database'
import logger from '../../logger'
import { NextApiResponse } from 'next'
import { withAuthApi } from './auth'

export interface GetRouteQuery extends Record<string, any> {
  route: keyof Database
}

const getStats = async (req: NextractRequest<GetRouteQuery>, res: NextApiResponse): Promise<any> => {
  if (req.method !== 'GET') return res.status(400).end(`Error: HTTP ${req.method} is not supported`)

  const { route: routename, nextract, ...query } = req.query
  const route: DatabaseAction<any, any> = req.options.database[routename]

  if (!route) {
    logger.error('UNKNOWN_GET_ROUTE', `Unknown route: ${routename}`)
    return res.status(400).end(`Error: ${routename} is not supported`)
  }

  Object.entries(query).forEach(([key, value]) => {
    if (key.endsWith('[]')) {
      query[key.slice(0, -2)] = value.split(',')
    }
  })

  const result = await route(query)

  return res.status(200).json(result)
}

const getStatsHandler = async (req: NextractRequest<GetRouteQuery>, res: NextApiResponse): Promise<any> => {
  if (!req.options.authOptions) {
    // When no auth options are defined, allow all requests
    return await getStats(req, res)
  }

  if (req.options.authOptions.users !== undefined && req.options.authOptions.users.length === 0) {
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

  // Handle authentication via iron-session
  return await withAuthApi(req, res, req.options.authOptions, async (_req, res) => {
    if (!_req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'You are not logged in.',
      })
    }

    await getStats(req, res)
  })
}

export default {
  action: 'get',
  handler: getStatsHandler,
}
