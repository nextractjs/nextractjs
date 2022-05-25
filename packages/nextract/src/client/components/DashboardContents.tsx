import { DashboardProps } from './Dashboard'
import useDashboardData from '../lib/useDashboardData'
import TimeframeSelector from './TimeframeSelector'
import AnalyticsGraphTile from './AnalyticsGraphTile'
import { PointInTime } from '../../api/database'
import ActiveUsersTile from './ActiveUsersTile'
import AnalyticsTableTile from './AnalyticsTableTile'
import { DropdownItem } from './AnalyticsTile'
import { PageviewEventBase } from 'api/types'
import Link from 'next/link'
import LoginOverlay from './LoginOverlay'

const SOURCES_DROPDOWN_ITEMS: Array<DropdownItem<keyof PageviewEventBase>> = [
  {
    label: 'Referrer',
    data: 'referrer',
  },
  {
    label: 'UTM Source',
    data: 'utmSource',
  },
  {
    label: 'UTM Medium',
    data: 'utmMedium',
  },
  {
    label: 'UTM Campaign',
    data: 'utmCampaign',
  },
]

export type DashboardContentProps = Pick<DashboardProps, 'allowedHostnames' | 'apiBasePath'>

const DashboardContents = (props: DashboardContentProps) => {
  const [dashboardData, refresh, onTimeframeChange, onSourceTypeChange] = useDashboardData({
    baseUrl: `/api${props.apiBasePath ?? '/nextract'}`,
    allowedHostnames: props.allowedHostnames,
  })

  return (
    <>
      {!dashboardData.isAuthorized && (
        <LoginOverlay apiBasePath={`/api${props.apiBasePath ?? '/nextract'}`} onLoggedIn={refresh} />
      )}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch justify-start gap-y-7">
        <span className="xs:flex-row flex flex-col flex-wrap items-start justify-between gap-y-6">
          <div className="mr-auto flex flex-col items-start justify-start">
            <h1 className="font-pt-sans text-accent m-0 text-5xl font-bold">Analytics</h1>
            <p className="font-inter text-secondary text-md mt-2 font-semibold">
              powered by{' '}
              <Link href="https://github.com/nextractjs/nextractjs">
                <a className="hover:underline" target="_blank">
                  Nextract.js
                </a>
              </Link>
            </p>
          </div>
          <TimeframeSelector onChange={onTimeframeChange} />
        </span>
        <div className="grid grid-cols-4 grid-rows-1 gap-6 sm:grid-cols-8 xl:grid-cols-11">
          <AnalyticsGraphTile
            label="Unique Visitors"
            metricName="Unique Visitor"
            data={dashboardData.getUniquePageviews}
            unit={dashboardData.timeframe?.groupBy ?? PointInTime.DAY}
            infoPopup={{
              title: 'What does "Unique Visitor" mean?',
              description:
                'To calculate the number of unique visitors, we try to count each visitor only once per day. If a user visits multiple pages or uses your app multiple times a day, only the first visit is counted.',
              closeText: 'Close',
            }}
          />
          <AnalyticsGraphTile
            label="Pageviews"
            metricName="Pageview"
            data={dashboardData.getPageviews}
            unit={dashboardData.timeframe?.groupBy ?? PointInTime.DAY}
          />
          <ActiveUsersTile activeUsersCount={dashboardData.getRealtimeUserCount} />
          <AnalyticsTableTile label="Most visited pages" data={dashboardData.getTopPages} />
          <AnalyticsTableTile
            label="Sources"
            dropdown={{ onChange: onSourceTypeChange, items: SOURCES_DROPDOWN_ITEMS }}
            data={dashboardData.getTopSources}
          />
        </div>
      </div>
    </>
  )
}

export default DashboardContents
