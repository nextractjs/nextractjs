import { NextractRequest, PageviewEventBase } from 'api/types'
import logger from '../../logger'

const createPageviewFromRequest = (req: NextractRequest) => {
  // Get the url and referrer from the request body
  const { u, r } = req.body
  if (!u) throw new Error('Missing required query param')

  // Build a url object from the url string
  // We need this to split the url into hostname and pathname easily
  const url = new URL(u.toString())

  // Check for utm params in the url
  const utmCampaign = url.searchParams.get('utm_campaign') ?? undefined
  const utmSource = url.searchParams.get('utm_source') ?? undefined
  const utmMedium = url.searchParams.get('utm_medium') ?? undefined
  const ref = url.searchParams.get('ref') ?? undefined

  // The referrer is either the referrer param extracted by the frontend or the ref query param
  const referrer = r ? r.toString() : ref ? ref.toString() : undefined

  // Combine all event data into a pageview event
  const pageview: PageviewEventBase = {
    referrer,
    utmCampaign,
    utmSource,
    utmMedium,
  }

  logger.debug('CREATED_PAGEVIEW', pageview)

  return pageview
}

export default createPageviewFromRequest
