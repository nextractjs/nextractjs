import { DashboardTable } from '../types'
import { useMemo } from 'react'
import Modal from './Modal'
import AnalyticsTable from './AnalyticsTable'
import AnalyticsTile, { DropdownProps } from './AnalyticsTile'

export interface AnalyticsTableTileProps<T> {
  label: string
  data?: DashboardTable
  dropdown?: DropdownProps<T>
}

const AnalyticsTableTile = <T,>({ label, data, dropdown }: AnalyticsTableTileProps<T>) => {
  if (!data) {
    return (
      <AnalyticsTile.Loading title={label} dropdown={dropdown}>
        <div className="bg-loading my-3 aspect-video w-full animate-pulse"></div>
        <div className="bg-loading h-7 w-32 animate-pulse self-center" />
      </AnalyticsTile.Loading>
    )
  }

  // Only show two labels (e.g. pathname and number of visitors) by default. If there are more, show the modal.
  const visibleData = useMemo<DashboardTable>(
    () => ({
      labels: data.labels.slice(0, 2),
      data: data.data.slice(0, 5).map((row) => ({ ...row, values: [row.values[0]] })),
    }),
    [data],
  )

  // If there are more than two labels, or more than 5 data entries show the modal.
  const hasMoreData = useMemo(() => (data.labels.length > 2 && data.data.length > 0) || data.data.length > 5, [data])

  // If there is no data, don't show the table and show a message.
  const hasData = useMemo(() => data.data.length > 0, [data])

  return (
    <AnalyticsTile.Tile title={label} dropdown={dropdown} className="h-fit gap-y-3">
      {hasData && <AnalyticsTable data={visibleData} hasBars={true} />}
      {!hasData && <p className="font-inter text-secondary w-full text-center text-xs">No data yet</p>}
      {hasMoreData && (
        <Modal
          title={label}
          closeText="Close"
          alignClose="center"
          openButtonChildren={<div className="text-sm text-opacity-60">Show more</div>}
        >
          <div className="my-3 w-full max-w-full overflow-x-auto">
            <AnalyticsTable data={data} />
          </div>
        </Modal>
      )}
    </AnalyticsTile.Tile>
  )
}

export default AnalyticsTableTile
