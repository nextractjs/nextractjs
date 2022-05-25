import { useEffect, useState } from 'react'
import { DashboardData, DashboardDataFromAPI as FromApi, DashboardTable, DashboardTimeGraph } from '../types'
import useApi, { ApiProps } from './useApi'
import { Timeframe } from '../components/TimeframeSelector'
import getFilledTimeGraph from './getFilledTimeGraph'
import { ApiTimeGraphResponse, ApiTopPagesResponse, ApiTopSourcesResponse, SourceType } from 'api/database'
import logger from '../../logger'

/**
 * Convert the API response to DashboardData
 *
 * Overview of different actions ("routename": API type -> Dashboard type)
 * "getRealtimeUserCount": number -> number
 * "getTopPages": ApiTopPagesResponse -> ApiTopPagesResponse
 * "getPageviews": ApiTimeGraphResponse -> DashboardTimeGraph
 * "getUniquePageviews": ApiTimeGraphResponse -> DashboardTimeGraph
 *
 * @param route Name of the API route that supplied the data
 * @param data Data returned by the API
 * @param time Selected timeframe
 * @returns A property value for DashboardData
 */
const apiToDashboardData = <K extends keyof FromApi>(route: K, data: any, time: Timeframe): FromApi[K] => {
  if (route === 'getUniquePageviews' || route === 'getPageviews') {
    const d = data as ApiTimeGraphResponse

    const timeGraph: DashboardTimeGraph = {
      ...d,
      data: getFilledTimeGraph(d.graph, time),
    }

    return timeGraph as FromApi[K]
  } else if (route === 'getTopPages') {
    const d = data as ApiTopPagesResponse

    const table: DashboardTable = {
      labels: ['Page', 'Visitors', 'Pageviews'],
      data: d.map((page) => ({
        label: page.path,
        values: [page.userCount, page.pageviewCount],
      })),
    }

    return table as FromApi[K]
  } else if (route === 'getTopSources') {
    const d = data as ApiTopSourcesResponse

    const table: DashboardTable = {
      labels: ['Value', 'Visitors', 'Pageviews'],
      data: d.map((source) => ({
        label: source.name,
        values: [source.userCount, source.pageviewCount],
      })),
    }

    return table as FromApi[K]
  } else {
    return data
  }
}

export type UpdateTimeframe = (time: Timeframe) => any
export type UpdateSourceType = (source: SourceType) => any

export type UseDashboardData = [
  dashboardData: AuthorizedData | UnauthorizedData,
  update: () => any,
  updateTimeframe: UpdateTimeframe,
  updateSourceType: UpdateSourceType,
]

export type AuthorizedData = Partial<DashboardData> & { isAuthorized: true }
export type UnauthorizedData = Partial<DashboardData> & { isAuthorized: false }
interface CurrentProps {
  timeframe?: Timeframe
  source?: SourceType
}

const useDashboardData = (props: ApiProps): UseDashboardData => {
  const [data, setData] = useState<AuthorizedData | UnauthorizedData>({ isAuthorized: true })
  const [currProps, setCurrProps] = useState<CurrentProps>({})

  const api = useApi(props)

  useEffect(() => update(), [currProps])

  const update = () => {
    const { source, timeframe } = currProps

    if (!source || !timeframe) return

    const promises = Object.entries(api).map(async ([routename, route]) => {
      return await route({ ...props, ...timeframe, sourceType: source })
        .then((data) => {
          setData((prev) => ({
            ...prev,
            isAuthorized: true,
            timeframe,
            [routename]: apiToDashboardData(routename as keyof FromApi, data, timeframe),
          }))
        })
        .catch((e) => {
          if (e.message === 'Unauthorized') {
            setData({ isAuthorized: false })
          } else {
            logger.error('API_ERROR', 'Failed to fetch route', `"${routename}"`, 'with error', e.message || e)
          }
        })
    })

    // Call all API routes with the updated props in parallel
    Promise.all(promises)
  }

  const updateTimeframe = async (time: Timeframe) => setCurrProps((prev) => ({ ...prev, timeframe: time }))

  const updateSourceType = async (source: SourceType) => setCurrProps((prev) => ({ ...prev, source }))

  return [data, update, updateTimeframe, updateSourceType]
}

export default useDashboardData
