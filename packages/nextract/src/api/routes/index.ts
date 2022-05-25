import { NextApiResponse } from 'next'

import trackEventRoute from './track'
import getStatsRoute from './get'

import authRoute from './auth'
import { NextractRequest } from 'api/types'

export interface Route {
  action: string
  handler: (req: NextractRequest<any>, res: NextApiResponse) => Promise<any>
}

export const routes: Route[] = [trackEventRoute, getStatsRoute, authRoute]
