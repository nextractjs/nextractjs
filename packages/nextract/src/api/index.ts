import { NextApiRequest, NextApiResponse } from 'next'
import logger from '../logger'
import { routes } from './routes'
import { NextractOptions, NextractRequest } from './types'

export type { NextractOptions }

const NextractHandler = async (req: NextApiRequest, res: NextApiResponse, options: NextractOptions) => {
  if (options.isDebug) {
    process.env.NEXTRACT_DEBUG = 'true'
  }

  return await new Promise(() => {
    if (!req.query.nextract) {
      const error = 'Cannot find [...nextract].js in pages/api/stats. Make sure the filename is written correctly.'

      logger.error('MISSING_NEXTRACT_API_ROUTE', error)
      return res.status(500).end(`Error: ${error}`)
    }

    const { nextract, action = nextract[0] || 'track', path = nextract[1] || '/' } = req.query

    const database = options.database
    if (!database) {
      const error = 'Cannot find database in Nextract options.'
      logger.error('MISSING_DATABASE', error)
      return res.status(500).end(`Error: ${error}`)
    }

    const analyticsRequest: NextractRequest = Object.assign(req, {
      options: {
        isDebug: false,
        ...options,
        database,
      },
      path: path.toString(),
    })

    checkOrigin(analyticsRequest, res)

    const route = routes.find((route) => route.action === action)

    if (route == null) {
      logger.error('UNKNOWN_ROUTE', `Unknown route: ${action}`)
      return res.status(400).end(`Error: Unknown route: ${action}`)
    }

    route.handler(analyticsRequest, res)
  })
}

const checkOrigin = (req: NextractRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (!req.options.allowedOrigins) return

  const origin = req.headers.origin

  if (!origin) return

  if (
    req.options.allowedOrigins === 'all' ||
    req.options.allowedOrigins.includes(origin) ||
    process.env.NODE_ENV === 'development'
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
}

const Nextract = (options: NextractOptions) => {
  return async (req: NextApiRequest, res: NextApiResponse) => await NextractHandler(req, res, options)
}

export default Nextract
