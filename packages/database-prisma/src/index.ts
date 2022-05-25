import {
  AnalyticsEvent,
  Database,
  ApiTimeGraphResponse,
  GetPageviewsOptions,
  EventFilterOptions,
  ApiTopPage,
  GetTopPagesOptions,
  GetTopSourcesOptions,
  ApiTopSource,
} from 'nextract/api/types'

import { PrismaClient } from '@prisma/client'
import { eventToPrisma, filtersToQuery, pageviewsToTimeGraph } from './utils'

const PrismaDatabase = (client: PrismaClient): Database => {
  return {
    insertEvent: async (event: AnalyticsEvent) => {
      await client.analyticsEvent.create({ data: eventToPrisma(event) })
      return {}
    },
    getUniquePageviews: async (options: GetPageviewsOptions): Promise<ApiTimeGraphResponse> => {
      const { startTime, endTime, groupBy, ...filters } = options

      /**
       * Find the the first pageview event of each user
       *
       * If a user has multiple pageviews, only the first one is counted as a _unique_ pageview.
       */
      const firstPageviewPerUserPerTime = (
        await client.analyticsEvent.groupBy({
          where: {
            ...filtersToQuery(filters),
            timestamp: {
              gte: new Date(Number(startTime)),
              lte: new Date(Number(endTime)),
            },
            isPageview: true,
          },
          by: ['userId'],
          _min: {
            [groupBy]: true,
          },
        })
      ).map((event) => ({
        userId: event.userId,
        timestamp: new Date(event._min[groupBy]).getTime(),
      }))

      interface UniquePageviewPerTime {
        count: number
        timestamp: number
      }

      /**
       * Group the pageviews by the time unit
       *
       * We want to aggregate the first pageview per user for each time unit. e.g. The number of unique pageviews grouped by hour.
       */
      const uniquePageviewsPerTime = firstPageviewPerUserPerTime.reduce(
        (acc: Record<number, UniquePageviewPerTime>, curr) => {
          // For easier grouping and sorting, we index each UniquePageviewByTime by the timestamp
          acc[curr.timestamp] = {
            count: (acc[curr.timestamp]?.count || 0) + 1,
            timestamp: curr.timestamp,
          }

          return acc
        },
        {},
      )

      // Sort the events by their timestamp
      const uniquePageviewsPerTimeSorted = Object.values(uniquePageviewsPerTime).sort(
        (a, b) => a.timestamp - b.timestamp,
      )

      return pageviewsToTimeGraph(uniquePageviewsPerTimeSorted)
    },
    getPageviews: async (options: GetPageviewsOptions): Promise<ApiTimeGraphResponse> => {
      const { startTime, endTime, groupBy, ...filters } = options

      const pageviewCountPerTime = (
        await client.analyticsEvent.groupBy({
          where: {
            ...filtersToQuery(filters),
            timestamp: {
              gte: new Date(Number(startTime)),
              lte: new Date(Number(endTime)),
            },
          },
          by: [groupBy],
          _count: {
            _all: true,
          },
        })
      ).map((pv) => ({
        timestamp: pv[groupBy].getTime(),
        count: pv._count._all,
      }))

      // Sort the events by their timestamp
      const pageviewsByTimeSorted = pageviewCountPerTime.sort((a, b) => a.timestamp - b.timestamp)

      return pageviewsToTimeGraph(pageviewsByTimeSorted)
    },
    getRealtimeUserCount: async (options: EventFilterOptions) => {
      const { ...filters } = options

      const startTime = new Date()
      startTime.setUTCMinutes(startTime.getUTCMinutes() - 4, 0, 0)

      const usersCount = await client.analyticsEvent.groupBy({
        where: {
          ...filtersToQuery(filters),
          timestamp: {
            gte: startTime,
          },
          isPageview: true,
        },
        by: ['userId'],
      })

      return usersCount.length
    },
    getTopPages: async (options: GetTopPagesOptions) => {
      const { startTime, endTime, ...filters } = options

      const topPagesResponse = await client.analyticsEvent.groupBy({
        where: {
          ...filtersToQuery(filters),
          timestamp: {
            gte: new Date(Number(startTime)),
            lte: new Date(Number(endTime)),
          },
          isPageview: true,
        },
        by: ['pathname', 'userId'],
        _count: {
          _all: true,
        },
      })

      type IndexedTopPageRecord = Record<string, ApiTopPage>

      /**
       * Find out how many pageviews + unique users each page has
       *
       * - We index the top pages by their pathname to map the pageviews and unique users to the correct page
       */
      const topPages = topPagesResponse.reduce<IndexedTopPageRecord>((acc, curr) => {
        const pathname = curr.pathname
        const pageviewCount = curr._count._all

        if (acc[pathname] === undefined) {
          // If the page doesn't exist, create it
          acc[pathname] = {
            path: pathname,
            pageviewCount: pageviewCount,
            userCount: 1,
          }
        } else {
          // If the page exists, increase the pageview count and unique user count
          acc[pathname].pageviewCount += pageviewCount
          acc[pathname].userCount += 1
        }

        return acc
      }, {})

      // Sort the pages by their user count
      const sortedTopPages = Object.values(topPages).sort(
        (a, b) => b.userCount - a.userCount || b.pageviewCount - a.pageviewCount, // Sort by user count first, then pageview count
      )

      return sortedTopPages
    },
    getTopSources: async (options: GetTopSourcesOptions) => {
      const { startTime, endTime, sourceType, ...filters } = options

      const topSourcesResponse = await client.analyticsEvent.groupBy({
        where: {
          ...filtersToQuery(filters),
          timestamp: {
            gte: new Date(Number(startTime)),
            lte: new Date(Number(endTime)),
          },
          [sourceType]: {
            not: null,
          },
          isPageview: true,
        },
        by: [sourceType, 'userId'],
        _count: {
          _all: true,
        },
      })

      type IndexedTopSourceRecord = Record<string, ApiTopSource>

      /**
       * Find out how many pageviews + unique users each source has
       *
       * - We index the top sources by their source name to map the pageviews and unique users to the correct source
       */
      const topSources = topSourcesResponse.reduce<IndexedTopSourceRecord>((acc, curr) => {
        const sourcename = curr[sourceType]
        const pageviewCount = curr._count._all

        if (!sourcename) return acc

        if (acc[sourcename] === undefined) {
          // If the page doesn't exist, create it
          acc[sourcename] = {
            name: sourcename,
            pageviewCount: pageviewCount,
            userCount: 1,
          }
        } else {
          // If the page exists, increase the pageview count and unique user count
          acc[sourcename].pageviewCount += pageviewCount
          acc[sourcename].userCount += 1
        }

        return acc
      }, {})

      // Sort the sources by their user count
      const sortedTopSources = Object.values(topSources).sort(
        (a, b) => b.userCount - a.userCount || b.pageviewCount - a.pageviewCount, // Sort by user count first, then pageview count
      )

      return sortedTopSources
    },
  }
}

export default PrismaDatabase
