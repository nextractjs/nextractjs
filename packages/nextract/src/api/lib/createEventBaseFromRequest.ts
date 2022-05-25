import createUserHash from './createUserHash'
import logger from '../../logger'
import { v4 as uuid } from 'uuid'
import { EventBase, NextractRequest } from 'api/types'

const createEventBaseFromRequest = (req: NextractRequest): EventBase => {
  // Get the url and referrer from the request body
  const { u } = req.body
  if (!u) throw new Error('Missing required query param: u.')

  // Build a url object from the url string
  // We need this to split the url into hostname and pathname easily
  const url = new URL(u.toString())

  // Combine all event data into a pageview event
  const event: EventBase = {
    id: uuid(),
    name: req.path,
    timestamp: new Date().getTime(),
    hostname: url.hostname,
    pathname: url.pathname,
    userId: createUserHash(req),
    isPageview: false, // By default we assume this is not a pageview; this will be overwritten if it is
  }

  logger.debug('CREATED_EVENT', event)

  return event
}

export default createEventBaseFromRequest
