import { PointInTime } from '../../api/database'

type Format = Intl.DateTimeFormatOptions & { asTime?: boolean }

/**
 *
 * @param forTime The time to get the format for (e.g. day if the date should be formatted as a day)
 * @param asWrittenOut Whether the format should be written out in long form. e.g. "10/16/2002 10 AM" instead of just "10 AM"
 * @returns
 */
export const getFormat = (forTime: PointInTime, asWrittenOut?: boolean): Format => {
  switch (forTime) {
    case PointInTime.DAY: {
      return {
        day: '2-digit',
        month: 'short',
        year: asWrittenOut ? 'numeric' : undefined,
      }
    }
    case PointInTime.HOUR: {
      return {
        hour: 'numeric',
        month: undefined,
        asTime: !asWrittenOut,
      }
    }
    case PointInTime.MINUTE: {
      return {
        hour: 'numeric',
        minute: 'numeric',
        asTime: !asWrittenOut,
      }
    }
    case PointInTime.MONTH: {
      return {
        month: 'short',
        year: '2-digit',
      }
    }
    case PointInTime.YEAR: {
      return {
        year: 'numeric',
        month: undefined,
      }
    }
    default:
      return {
        day: '2-digit',
        month: 'short',
        year: undefined,
      }
  }
}

export interface FormatDateOptions {
  date: Date
  unit: PointInTime
  asWrittenOut?: boolean
}

export const formatDate = ({ unit, date, asWrittenOut }: FormatDateOptions) => {
  const format = getFormat(unit, asWrittenOut)
  const locale = (navigator.languages !== undefined ? navigator.languages[0] : navigator.language) ?? 'en-US'

  // Format date as time (e.g. when the user selects the last 24 hours)
  if (format.asTime) return date.toLocaleTimeString(locale, format)

  // Format the date as a date (e.g. when the user selects the last 7 days)
  return date.toLocaleDateString(locale, format)
}

export interface FormatNumberOptions {
  value: number
  compact?: boolean
}

export const formatNumber = ({ value, compact }: FormatNumberOptions) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: compact ? 'compact' : 'standard',
  }).format(value)
}
