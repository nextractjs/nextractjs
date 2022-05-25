import { GraphEntry } from 'client/types'
import { PointInTime, TimeGraph } from '../../api/database'
import { Timeframe } from '../components/TimeframeSelector'

/**
 * Fills in missing data points in a time graph. The API only returns data point if they exist and we need to make sure no time points (e.g. minutes, hours, days, months, years) are missing.
 */
const getFilledTimeGraph = (data: TimeGraph, time: Timeframe): GraphEntry[] => {
  // Get all possible dates in timeframe
  const times: GraphEntry[] = []
  let currTime = time.startTime

  // Calculate all possible time points in the timeframe and for each time point, check if the API returned data for it
  while (currTime < time.endTime) {
    times.push({
      x: currTime,
      y: data[currTime] || 0,
      // y: Math.random() * 100000,
    })

    currTime = getNextTimepoint(currTime, time.groupBy)
  }

  return times
}

const getNextTimepoint = (from: number, to: PointInTime): number => {
  switch (to) {
    case PointInTime.MINUTE:
      return from + 1000 * 60
    case PointInTime.HOUR:
      return from + 1000 * 60 * 60
    case PointInTime.DAY: {
      const fromDate = new Date(from)
      return fromDate.setUTCDate(fromDate.getUTCDate() + 1)
    }
    case PointInTime.MONTH: {
      const fromDate = new Date(from)
      return fromDate.setUTCMonth(fromDate.getUTCMonth() + 1)
    }
    case PointInTime.YEAR: {
      const fromDate = new Date(from)
      return fromDate.setUTCFullYear(fromDate.getUTCFullYear() + 1)
    }
  }
}

export default getFilledTimeGraph
