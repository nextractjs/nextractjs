import { AnalyticsEvent, PageviewEventBase } from './types'

export interface EventFilterOptions {
  hostnames?: string[]
}

export interface GetPageviewsOptions extends EventFilterOptions {
  startTime: number
  endTime: number
  groupBy: PointInTime
}

export interface GetTopPagesOptions extends EventFilterOptions {
  startTime: number
  endTime: number
}

export type SourceType = keyof PageviewEventBase

export interface GetTopSourcesOptions extends EventFilterOptions {
  startTime: number
  endTime: number
  sourceType: SourceType
}

export enum PointInTime {
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export type TimeGraph = Record<number, number>

export interface ApiTimeGraphResponse {
  total: number
  graph: TimeGraph
}

export interface ApiTopPage {
  path: string
  pageviewCount: number
  userCount: number
}

export type ApiTopPagesResponse = ApiTopPage[]

export interface ApiTopSource {
  name: string
  userCount: number
  pageviewCount: number
}

export type ApiTopSourcesResponse = ApiTopSource[]

export type DatabaseAction<T = any, S = any> = (options: T) => Promise<S>

export interface Database {
  insertEvent: DatabaseAction<AnalyticsEvent, {}>
  getUniquePageviews: DatabaseAction<GetPageviewsOptions, ApiTimeGraphResponse>
  getPageviews: DatabaseAction<GetPageviewsOptions, ApiTimeGraphResponse>
  getRealtimeUserCount: DatabaseAction<EventFilterOptions, number>
  getTopPages: DatabaseAction<GetTopPagesOptions, ApiTopPagesResponse>
  getTopSources: DatabaseAction<GetTopSourcesOptions, ApiTopSourcesResponse>
}
