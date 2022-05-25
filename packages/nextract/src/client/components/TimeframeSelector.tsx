import { PointInTime } from '../../api/database'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

interface TimeframeBuilder {
  label: string
  /**
   * The start of the timeframe in milliseconds since epoch.
   */
  getStartTime: () => number
  /**
   * The end of the timeframe in milliseconds since epoch.
   */
  getEndTime: () => number
  groupBy: PointInTime
}

// Right now

// Today
// Last 24 hours

// This week
// Last 7 days

// This month
// Last 30 days

// This year
// Last 12 months

// All time

const SUPPORTED_TIMEFRAMES: TimeframeBuilder[][] = [
  [
    {
      label: 'Right now',
      getStartTime: () => {
        const now = new Date()
        return now.setUTCMinutes(now.getUTCMinutes() - 4, 0, 0) // 5 minutes
      },
      getEndTime: () => Date.now(),
      groupBy: PointInTime.MINUTE,
    },
  ],
  [
    {
      label: 'Today',
      getStartTime: () => new Date().setUTCHours(0, 0, 0, 0),
      getEndTime: () => new Date().setUTCHours(23, 59, 59, 999),
      groupBy: PointInTime.HOUR,
    },
    {
      label: 'Last 24 hours',
      getStartTime: () => {
        const now = new Date()
        return now.setHours(now.getUTCHours() - 23, 0, 0, 0)
      },
      getEndTime: () => Date.now(),
      groupBy: PointInTime.HOUR,
    },
  ],
  [
    {
      label: 'This week',
      getStartTime: () => {
        // FYI Nextract.js starts the week on Monday
        const now = new Date()
        return new Date(
          now.setUTCDate(now.getUTCDate() - now.getUTCDay() + (now.getUTCDay() === 0 ? -6 : 1)),
        ).setUTCHours(0, 0, 0, 0)
      },
      getEndTime: () => {
        const now = new Date()
        now.setUTCDate(now.getUTCDate() - now.getUTCDay() + (now.getUTCDay() === 0 ? -6 : 1) + 6)
        return now.setUTCHours(23, 59, 59, 999)
      },
      groupBy: PointInTime.DAY,
    },
    {
      label: 'Last 7 days',
      getStartTime: () => {
        const now = new Date()
        now.setUTCHours(0, 0, 0, 0)
        return now.setUTCDate(now.getUTCDate() - 6)
      },
      getEndTime: () => Date.now(),
      groupBy: PointInTime.DAY,
    },
  ],
  [
    {
      label: 'This month',
      getStartTime: () => {
        const now = new Date()
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), 1).setUTCHours(0, 0, 0, 0)
      },
      getEndTime: () => {
        const now = new Date()
        return new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0).setUTCHours(23, 59, 59, 999)
      },
      groupBy: PointInTime.DAY,
    },
    {
      label: 'Last 30 days',
      getStartTime: () => {
        const now = new Date()
        now.setUTCHours(0, 0, 0, 0)
        return now.setUTCDate(now.getUTCDate() - 29)
      },
      getEndTime: () => Date.now(),
      groupBy: PointInTime.DAY,
    },
  ],
  [
    {
      label: 'This year',
      getStartTime: () => {
        const now = new Date()
        now.setUTCFullYear(now.getUTCFullYear(), 0, 1)
        return now.setUTCHours(0, 0, 0, 0)
      },
      getEndTime: () => {
        const now = new Date()
        now.setUTCFullYear(now.getUTCFullYear(), 11, 31)
        return now.setUTCHours(23, 59, 59, 999)
      },
      groupBy: PointInTime.MONTH,
    },
    {
      label: 'Last 12 months',
      getStartTime: () => {
        const now = new Date()
        now.setUTCDate(1)
        now.setUTCHours(0, 0, 0, 0)
        return now.setUTCMonth(now.getUTCMonth() - 11)
      },
      getEndTime: () => Date.now(),
      groupBy: PointInTime.MONTH,
    },
  ],
]

const LOCALSTORAGE_KEY = 'nextract-timeframe'

const ChevronDownIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className ?? ''}
  >
    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
  </svg>
)

export interface Timeframe {
  startTime: number
  endTime: number
  groupBy: PointInTime
}

export interface TimeframeSelectorProps {
  onChange: (time: Timeframe) => any
}

const TimeframeSelector = ({ onChange }: TimeframeSelectorProps) => {
  const [selected, setSelected] = useState<TimeframeBuilder>(SUPPORTED_TIMEFRAMES[2][0])
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const prevTimeframe = localStorage.getItem(LOCALSTORAGE_KEY)
    const prevItem = SUPPORTED_TIMEFRAMES.flatMap((timeframes) => timeframes).find(
      (timeframe) => timeframe.label === prevTimeframe,
    )

    setSelected(prevItem ?? SUPPORTED_TIMEFRAMES[2][0])
    setIsInitializing(false)
  }, [])

  useEffect(() => {
    if (isInitializing) return

    onChange({
      startTime: selected.getStartTime(),
      endTime: selected.getEndTime(),
      groupBy: selected.groupBy,
    })

    localStorage.setItem(LOCALSTORAGE_KEY, selected.label)
  }, [selected, isInitializing])

  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <div>
        <Menu.Button className="focus-visible:ring-secondary bg-primary font-inter shadow-default inline-flex items-center justify-center gap-x-2 rounded-lg py-2 px-3 text-sm font-semibold focus:outline-none focus:ring-offset-1 focus-visible:ring-2">
          {selected.label}
          <ChevronDownIcon />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-50"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
      >
        <Menu.Items className="bg-primary divide-accent ring-secondary shadow-default absolute right-0 mt-3 origin-top-right divide-y divide-opacity-10 rounded-lg text-left ring-1 ring-opacity-5 focus:outline-none">
          {SUPPORTED_TIMEFRAMES.map((timeframe, i) => (
            <div className="mb-2 flex flex-col items-stretch" key={i}>
              {timeframe.map((timeframe) => (
                <Menu.Item key={timeframe.label}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelected(timeframe)}
                      className={`${active ? 'bg-opacity-10' : 'bg-opacity-0'} ${
                        selected === timeframe ? 'font-bold' : 'font-medium'
                      } bg-accent font-inter mx-2 mt-2 whitespace-nowrap rounded-lg px-3 py-1 text-left text-sm`}
                    >
                      {timeframe.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default TimeframeSelector
