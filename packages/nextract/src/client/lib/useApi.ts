import { GetRouteQuery } from 'api/routes/get'
import {
  Database,
  GetPageviewsOptions,
  ApiTimeGraphResponse,
  EventFilterOptions,
  ApiTopPagesResponse,
  GetTopPagesOptions,
  GetTopSourcesOptions,
  ApiTopSourcesResponse,
} from '../../api/database'

export type APIResponse<K extends keyof NextractAPI> = Awaited<ReturnType<NextractAPI[K]>>

export type NextractAPI = Omit<Database, 'insertEvent'>

export interface ApiProps {
  baseUrl: string
  allowedHostnames?: string[]
}

const useApi = (props: ApiProps): NextractAPI => {
  const getApiEndpoint = (path: string, query: Record<string, any | any[]> = {}) => {
    const searchParams = new URLSearchParams()
    let result = props.baseUrl + path

    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          searchParams.append(`${key}[]`, item)
        })
      } else if (value !== undefined) {
        searchParams.set(key, value)
      }
    })

    const queryString = searchParams.toString()
    if (queryString) {
      result += `?${queryString}`
    }

    return result
  }

  const getJSON = async <T>(path: string, query: { [key: string]: any } = {}): Promise<T> => {
    try {
      const res = await fetch(getApiEndpoint(path, query), { credentials: 'include' })

      if (!res.ok) {
        return await Promise.reject(new Error(res.statusText))
      }

      return await res.json()
    } catch (e) {
      return await Promise.reject(e)
    }
  }

  const get = async <T>(query: GetRouteQuery) => {
    return await getJSON<T>('/get', {
      ...query,
      ...(props.allowedHostnames !== undefined && { hostnames: props.allowedHostnames }),
    })
  }

  const getUniquePageviews = async (options: GetPageviewsOptions) => {
    return await get<ApiTimeGraphResponse>({
      ...options,
      route: 'getUniquePageviews',
    })
  }

  const getPageviews = async (options: GetPageviewsOptions) => {
    return await get<ApiTimeGraphResponse>({
      ...options,
      route: 'getPageviews',
    })
  }

  const getRealtimeUserCount = async (options: EventFilterOptions) => {
    return await get<number>({
      ...options,
      route: 'getRealtimeUserCount',
    })
  }

  const getTopPages = async (options: GetTopPagesOptions) => {
    return await get<ApiTopPagesResponse>({
      ...options,
      route: 'getTopPages',
    })
  }

  const getTopSources = async (options: GetTopSourcesOptions) => {
    return await get<ApiTopSourcesResponse>({
      ...options,
      route: 'getTopSources',
    })
  }

  return {
    getUniquePageviews,
    getPageviews,
    getRealtimeUserCount,
    getTopPages,
    getTopSources,
  }
}

export default useApi
