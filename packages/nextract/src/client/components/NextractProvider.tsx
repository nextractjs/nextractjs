import { useRouter } from 'next/router'
import { useEffect } from 'react'
import logger from '../../logger'
import trackPageview from '../lib/trackPageview'
import { ApiClientOptions } from '../types'

export interface NextractProviderProps extends ApiClientOptions {
  /**
   * Nextract.js will automatically pause tracking when it is running on localhost. You can optionally overwrite this setting here.
   *
   * @default false
   */
  trackLocalhost?: boolean
  /**
   * Exclude paths from being tracked by Nextract.js.
   *
   * @default []
   */
  exclude?: string[]
  /**
   * Disable Nextract.js entirely.
   *
   * @default true
   */
  enabled?: boolean
  /**
   * The debug mode that determines whether the plugin should log development events to the browser console.
   *
   * @default false
   */
  isDebug?: boolean
  children: React.ReactNode
}

const NextractProvider = (props: NextractProviderProps): JSX.Element => {
  if (props.isDebug) {
    process.env.NEXTRACT_DEBUG = 'true'
  }

  const router = useRouter()
  let lastTrackedPath: string

  const { apiBasePath = '/api/nextract', enabled = true, exclude = [], children, trackLocalhost } = props

  // Only track events from withing useEffect to prevent duplicate events from SSR pages
  useEffect(() => {
    // Check if tracking is currently disabled
    if (
      !enabled ||
      (window.location.hostname === 'localhost' && !trackLocalhost) ||
      exclude.includes(router.pathname)
    ) {
      logger.debug('TRACKING_DISABLED', 'Nextract.js event tracking is disabled')
      return
    }

    // Don't track any url twice in a row
    if (router.pathname === lastTrackedPath) return

    logger.debug('TRACKING_PAGEVIEW', 'Tracking a pageview')

    const pageview = {
      url: window.location.href,
      ...(!document.referrer.includes(window.location.hostname) && {
        referrer: document.referrer,
      }),
    }

    lastTrackedPath = router.pathname

    // Send pageview event to API
    trackPageview({
      apiBasePath,
      pageview,
    })
  }, [router.pathname])

  return <>{children}</>
}

export { NextractProvider }
