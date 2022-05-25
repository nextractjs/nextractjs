import { formatDate, formatNumber } from '../lib/format'
import { GraphEntry } from '../types'
import { PointInTime } from '../../api/database'
import { memo, useEffect, useState } from 'react'
import {
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import getRelativePointInTime from '../lib/getRelativePointInTime'

export interface AnalyticsGraphProps {
  data: GraphEntry[]
  className: string
  metricName: string
  unit: PointInTime
}

interface AnalyticsGraphTooltipProps {
  date: number
  metricName: string
  data: GraphEntry[]
  unit: PointInTime
}

const AnalyticsGraphTooltip = memo(({ date, data, metricName, unit }: AnalyticsGraphTooltipProps) => {
  const [value, setValue] = useState(data.find((d) => d.x === date)?.y ?? 0)

  useEffect(() => {
    const newValue = data.find((d) => d.x === date)?.y ?? 0
    if (newValue !== value) setValue(newValue)
  }, [data, date])

  if (!date) return null

  return (
    <div
      role="tooltip"
      className="shadow-default bg-primary text-secondary border-secondary rounded-lg border border-opacity-5 p-3"
    >
      <p className="font-semibold">{formatDate({ date: new Date(date), unit, asWrittenOut: true })}</p>
      <p>
        {formatNumber({ value })} {metricName}
        {value !== 1 ? 's' : ''} {/* handle plural for a value of more than one/ zero */}
      </p>
    </div>
  )
})

const AnalyticsGraph = ({ data, className, metricName, unit }: AnalyticsGraphProps) => {
  const [predictionSegment, setPredictionSegment] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ])
  const [knownData, setKnownData] = useState<GraphEntry[]>(data)

  const load = () => {
    const now = getRelativePointInTime(new Date(), unit).getTime()
    const firstPredictionIndex = data.findIndex((entry) => entry.x >= now) + 1

    const lastKnownData = {
      x: data[firstPredictionIndex - 2]?.x ?? 0,
      y: data[firstPredictionIndex - 2]?.y ?? 0,
    }

    const firstPrediction = {
      x: data[firstPredictionIndex - 1]?.x ?? 0,
      y: data[firstPredictionIndex - 1]?.y ?? 0,
    }

    setPredictionSegment([lastKnownData, firstPrediction])
    setKnownData(data.filter((d) => d.x <= lastKnownData.x))
  }

  useEffect(() => load(), [data])

  return (
    <div className={className}>
      <ResponsiveContainer aspect={1.5 / 1} width="100%" height="100%" maxHeight={300}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 10,
          }}
          className="text-sm"
        >
          <CartesianGrid strokeDasharray="10 10" vertical={false} />
          <XAxis
            dataKey="x"
            allowDuplicatedCategory={false}
            tickFormatter={(value) => formatDate({ date: new Date(value), unit })}
            minTickGap={10}
          />
          <YAxis
            tickFormatter={(value) => formatNumber({ value, compact: true })}
            mirror={true}
            baseFrequency={1}
            allowDecimals={false}
            domain={[0, 'dataMax']}
          />
          <Tooltip
            content={(props) => (
              <AnalyticsGraphTooltip date={props.label} data={data} metricName={metricName} unit={unit} />
            )}
          />
          {/* Use a reference line to draw values that are (yet) unknown/unsure. E.g. the pageviews for today which are subject to change */}
          <ReferenceLine
            className="text-accent"
            stroke="currentColor"
            strokeWidth={2.5}
            segment={predictionSegment}
            strokeDasharray="5 5"
          />
          {/* Use a line to draw all known (past) data that can not change */}
          <Line
            type="monotone"
            dataKey="y"
            isAnimationActive={false}
            strokeWidth={2.5}
            data={knownData}
            tooltipType="none"
            dot={false}
            className="text-accent"
            stroke="currentColor"
            activeDot={<Dot className="fill-accent" strokeWidth={0} />}
          />
          {/* Use a transparent line to make sure the whole timeframe (e.g. month) is visible even when the data is not yet known */}
          <Line dataKey="y" stroke="transparent" strokeWidth={2.5} data={data} dot={false} activeDot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AnalyticsGraph
