import { TrackEventApiResponse } from 'api/routes/track'
import logger from '../../logger'

export interface TrackPageviewProps {
  apiBasePath: string
  pageview: {
    url: string
    referrer?: string
  }
}

const trackPageview = async (props: TrackPageviewProps) => {
  const pageview = props.pageview

  const body = JSON.stringify({
    u: pageview.url,
    r: pageview.referrer ?? null,
  })

  try {
    const res = await fetch(`/api${props.apiBasePath}/track/pageview`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      if (res.status === 404) {
        logger.error(
          'API_NOT_FOUND',
          `The API route was not found. Make sure that you have a file named [...nextract].js or [...nextract].ts at /api/${props.apiBasePath} in your pages directory.„`,
        )
        return
      }

      logger.error(
        'API_ERROR',
        `An error occurred while trying to send the pageview event to the API. Status code: ${res.status}`,
      )

      return
    }

    const json: TrackEventApiResponse = await res.json()

    logger.debug('TRACKED_PAGEVIEW', `Pageview event was successfully tracked. Event ID: ${json.data?.id ?? 'unknown'}`)
  } catch (e) {
    logger.error(
      'API_ERROR',
      `An error occurred while trying to send the pageview event to the API. Error: ${(e as Error).message}`,
    )
  }
}

export default trackPageview
