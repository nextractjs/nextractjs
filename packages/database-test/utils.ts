import { AnalyticsEvent, PageviewEventBase } from 'nextract/api/types'

const getEventForTimestamp = (timestamp: Date, key: number | string = ''): AnalyticsEvent => ({
  id: `id:${key}`,
  name: 'pageview',
  timestamp: timestamp.getTime(),
  hostname: 'www.example.com',
  pathname: '/test-path',
  userId: `userId:${key}`,
  isPageview: true,
  payload: {},
  referrer: undefined,
  utmCampaign: undefined,
  utmSource: undefined,
  utmMedium: undefined,
})

const getEventForPathname = (pathname: string, userId: string, key: number | string = ''): AnalyticsEvent => ({
  id: `id:${key}`,
  name: 'pageview',
  timestamp: new Date().getTime(),
  hostname: 'www.example.com',
  pathname: pathname,
  userId: `userId:${userId}`,
  isPageview: true,
  payload: {},
  referrer: undefined,
  utmCampaign: undefined,
  utmSource: undefined,
  utmMedium: undefined,
})

const getEventForSource = (
  source: Partial<PageviewEventBase>,
  userId: string,
  key: number | string = '',
): AnalyticsEvent => ({
  id: `id:${key}`,
  name: 'pageview',
  timestamp: new Date().getTime(),
  hostname: 'www.example.com',
  pathname: '/',
  userId: `userId:${userId}`,
  isPageview: true,
  payload: {},
  referrer: undefined,
  utmCampaign: undefined,
  utmSource: undefined,
  utmMedium: undefined,
  ...source,
})

export { getEventForTimestamp, getEventForPathname, getEventForSource }
