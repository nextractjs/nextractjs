import { Timeframe } from './components/TimeframeSelector'
import { NextractAPI } from './lib/useApi'

export interface ApiClientOptions {
  /**
   * The base path the Nextract.js api is located at. This is the folder in the `/pages/api` directory that holds the Nextract.js API route named either `[...nextract].js` or `[...nextract].ts`.
   *
   * e.g. the `apiBasePath` for `/pages/api/nextract/[...nextract].js` is `/nextract`
   *
   * @default "/nextract"
   */
  apiBasePath?: string
}

export interface DashboardTimeGraph {
  total: number
  data: GraphEntry[]
}

export interface GraphEntry {
  x: number
  y: number
}

export interface DashboardTable {
  labels: string[]
  data: TableEntry[]
}

export interface TableEntry {
  label: string
  values: number[]
}

// Map each API route name to the corresponding Dashboard data type
export interface DashboardDataFromAPI extends Record<keyof NextractAPI, any> {
  getPageviews: DashboardTimeGraph
  getUniquePageviews: DashboardTimeGraph
  getRealtimeUserCount: number
  getTopPages: DashboardTable
  getTopSources: DashboardTable
}

export interface DashboardData extends DashboardDataFromAPI {
  timeframe: Timeframe
}
