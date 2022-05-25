import { formatNumber } from '../lib/format'
import { DashboardTimeGraph } from '../types'
import { PointInTime } from '../../api/database'
import AnalyticsGraph from './AnalyticsGraph'
import AnalyticsTile, { InfoPopupProps } from './AnalyticsTile'

export interface AnalyticsGraphTileProps {
  label: string
  metricName: string
  data?: DashboardTimeGraph
  unit: PointInTime
  infoPopup?: InfoPopupProps
}

const AnalyticsGraphTile = ({ label, metricName, data, unit, infoPopup }: AnalyticsGraphTileProps) => {
  // Loading state: Skeleton screen
  if (!data) {
    return (
      <AnalyticsTile.Loading title={label} infoPopup={infoPopup}>
        <div className="bg-loading my-3 h-7 w-16 animate-pulse" />
        <div className="bg-loading aspect-video w-full animate-pulse"></div>
      </AnalyticsTile.Loading>
    )
  }

  return (
    <AnalyticsTile.Tile title={label} infoPopup={infoPopup}>
      <p className="font-inter text-secondary pb-3 text-2xl font-semibold">{formatNumber({ value: data.total })}</p>
      <AnalyticsGraph data={data.data} metricName={metricName} unit={unit} className="w-full" />
    </AnalyticsTile.Tile>
  )
}

export default AnalyticsGraphTile
