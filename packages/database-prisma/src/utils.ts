import { AnalyticsEvent as PrismaAnalyticsEvent } from '@prisma/client'
import { AnalyticsEvent, EventFilterOptions, PointInTime, TimeGraph } from 'nextract/api/types'

/**
 * Converts an AnalyticsEvent to a PrismaAnalyticsEvent.
 * 
 * In Prisma, the event's are indexed by their year, month, day, hour and minute. That way we are able to group events by their time. 

 * @param event AnalyticsEvent to be converted/serialized to Prisma
 * @returns The converted event to be inserted into the database
 */
export const eventToPrisma = (event: AnalyticsEvent): PrismaAnalyticsEvent => {
  const date = new Date(Number(event.timestamp))

  return {
    ...event,
    payload: JSON.stringify(event.payload),
    referrer: event.referrer ?? null,
    utmCampaign: event.utmCampaign ?? null,
    utmMedium: event.utmMedium ?? null,
    utmSource: event.utmSource ?? null,
    timestamp: date,
    year: getUTCDateCategory(date, PointInTime.YEAR),
    day: getUTCDateCategory(date, PointInTime.DAY),
    hour: getUTCDateCategory(date, PointInTime.HOUR),
    minute: getUTCDateCategory(date, PointInTime.MINUTE),
    month: getUTCDateCategory(date, PointInTime.MONTH),
  }
}

// Find a point in time relative to a date. For example, find the start of the year/month/minute of a date.
// e.g. the 16th October 2002 with pit YEAR would return the first day of the year (1st January 2002)
const getUTCDateCategory = (date: Date, pit: PointInTime) => {
  const copy = new Date(date.getTime())

  switch (pit) {
    case PointInTime.YEAR:
      copy.setUTCMonth(0, 1) // First day of the year
      copy.setUTCHours(0, 0, 0, 0)
      break
    case PointInTime.MONTH:
      copy.setUTCDate(1) // First day of the month
      copy.setUTCHours(0, 0, 0, 0)
      break
    case PointInTime.DAY:
      copy.setUTCHours(0, 0, 0, 0) // First hour of the day
      break
    case PointInTime.HOUR:
      copy.setUTCMinutes(0, 0, 0) // First minute of the hour
      break
    case PointInTime.MINUTE:
      copy.setUTCSeconds(0, 0) // First second of the minute
      break
    default:
      throw new Error(`Unknown point in time: ${pit}`)
  }

  return copy
}

/**
 * Converts a PrismaAnalyticsEvent to an AnalyticsEvent.
 * 
 * In Prisma, the event's are indexed by their year, month, day, hour and minute. That way we are able to group events by their time. 

 * @param event PrismaAnalyticsEvent to be converted/deserialized to Prisma
 * @returns The converted event to be used by Nextract.js
 */
export const prismaToEvent = (event: PrismaAnalyticsEvent): AnalyticsEvent => {
  return {
    hostname: event.hostname,
    id: event.id,
    isPageview: event.isPageview,
    name: event.name,
    pathname: event.pathname,
    userId: event.userId,
    payload: JSON.parse(event.payload),
    referrer: event.referrer ?? undefined,
    timestamp: event.timestamp.getTime(),
    utmCampaign: event.utmCampaign ?? undefined,
    utmMedium: event.utmMedium ?? undefined,
    utmSource: event.utmSource ?? undefined,
  }
}

export const filtersToQuery = (filters: EventFilterOptions) => {
  const query: { [key: string]: any } = {}

  if (filters.hostnames) {
    query.hostname = {
      in: filters.hostnames,
    }
  }

  return query
}

export interface Pageview {
  timestamp: number
  count: number
}

export const pageviewsToTimeGraph = (pageviews: Pageview[]) => ({
  graph: pageviews.reduce<TimeGraph>((acc, curr) => {
    acc[curr.timestamp] = curr.count
    return acc
  }, {}),
  total: pageviews.reduce((acc, curr) => acc + curr.count, 0),
})
