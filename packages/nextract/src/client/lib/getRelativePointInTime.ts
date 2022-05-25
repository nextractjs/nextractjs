import { PointInTime } from '../../api/database'

const getRelativePointInTime = (date: Date, pit: PointInTime) => {
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

export default getRelativePointInTime
