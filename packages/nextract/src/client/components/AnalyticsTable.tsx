import { formatNumber } from '../lib/format'
import { DashboardTable } from '../types'
import { useMemo } from 'react'

export interface AnalyticsTableProps {
  data: DashboardTable
  hasBars?: boolean
}

const AnalyticsTable = ({ data, hasBars }: AnalyticsTableProps) => {
  const maxValue = useMemo(() => {
    const values = data.data.map((row) => row.values[0])
    return Math.max(...values)
  }, [data])

  return (
    <div className="flex flex-col" role="table">
      <div role="rowgroup">
        <div className="flex w-full flex-row justify-between" role="row">
          <p
            className="font-inter text-secondary w-full pb-3 text-xs font-medium text-opacity-80"
            style={{ maxWidth: `calc(100% - ${5 * (data.labels.length - 1)}rem)` }}
          >
            {data.labels[0]}
          </p>
          {data.labels.slice(1).map((label, i) => (
            <p
              className="font-inter text-secondary pb-3 text-xs font-medium text-opacity-80"
              role="columnheader"
              key={i}
            >
              {label}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-1.5" role="rowgroup">
        {data.data.map((row, i) => (
          <div
            className={`${
              !hasBars ? 'bg-accent rounded bg-opacity-5' : ''
            } flex w-full flex-row items-center justify-between`}
            role="row"
            key={i}
          >
            <div className="relative w-full" style={{ maxWidth: `calc(100% - ${5 * row.values.length}rem)` }}>
              <div
                className={`${
                  !hasBars ? 'hidden' : 'block'
                } bg-accent absolute top-0 left-0 z-0 h-full rounded bg-opacity-10`}
                style={{ width: `${(row.values[0] / maxValue) * 100}%` }}
              />
              <p
                className="font-inter text-secondary z-1 relative m-2 truncate text-left text-sm font-normal"
                role="rowheader"
              >
                {row.label}
              </p>
            </div>
            {row.values.map((value, j) => (
              <p className="font-inter text-secondary mr-2 text-right text-sm font-medium" role="cell" key={j}>
                {formatNumber({ value: value, compact: true })}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsTable
