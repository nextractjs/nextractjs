import {
  ApiTimeGraphResponse,
  ApiTopPagesResponse,
  ApiTopSourcesResponse,
  PageviewEventBase,
  PointInTime,
  SourceType,
} from 'nextract/api/types'

interface TimeGraphTestCase {
  dates: string[]
  groupBy: PointInTime
  tests: {
    name: string
    startTime: number
    endTime: number
    expected: ApiTimeGraphResponse
  }[]
}

interface TopPageTestCase {
  data: {
    pathname: string
    userId: string
  }[]
  test: {
    name: string
    expected: ApiTopPagesResponse
  }
}

interface TopSourceTestCase {
  data: (Partial<PageviewEventBase> & { userId: string })[]
  tests: {
    name: string
    sourceType: SourceType
    expected: ApiTopSourcesResponse
  }[]
}

export { TimeGraphTestCase, TopPageTestCase, TopSourceTestCase }
