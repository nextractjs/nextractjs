import { AnalyticsEvent, NextractRequest } from 'api/types'
import logger from '../../logger'
import { NextApiResponse } from 'next'
import trackEvent from '../lib/trackEvent'

export interface TrackEventApiResponse {
  success: boolean
  message: string
  data?: AnalyticsEvent
}

const trackEventHandler = async (req: NextractRequest, res: NextApiResponse<TrackEventApiResponse>): Promise<any> => {
  if (req.method !== 'POST') return res.status(400).end(`Error: HTTP ${req.method} is not supported`)

  try {
    const event = await trackEvent(req)
    logger.debug('EVENT_INSERTED', 'Event was inserted successfully', event)
    return res.status(200).json({
      success: true,
      message: 'Event was handled successfully',
      data: event,
    })
  } catch (e: any) {
    logger.error('FAILED_TRACK_EVENT', 'Event tracking failed with error:', e.message || e)
  }
}

export default {
  action: 'track',
  handler: trackEventHandler,
}
