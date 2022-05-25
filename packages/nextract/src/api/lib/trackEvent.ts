import createEventFromRequest from './createEventBaseFromRequest'
import createPageviewFromRequest from './createPageviewFromRequest'
import logger from '../../logger'
import { AnalyticsEvent, NextractRequest } from 'api/types'

const trackEvent = async (req: NextractRequest) =>
  await new Promise<AnalyticsEvent>((resolve, reject) => {
    const { database } = req.options

    if (!database) {
      const error = 'Cannot find database in Nextract options.'
      logger.error('MISSING_DATABASE', error)
      return reject(error)
    }

    let event: AnalyticsEvent = {
      ...createEventFromRequest(req),
      isPageview: true,
      payload: {},
    }

    if (event.isPageview)
      event = {
        ...event,
        ...createPageviewFromRequest(req),
      }

    // Insert event into database via database adapter
    database
      .insertEvent(event)
      .then(() => resolve(event))
      .catch((error) => {
        logger.error('DATABASE_INSERT_FAILED', error)
        reject(error)
      })
  })

export default trackEvent
