import { useMemo } from 'react'
import { formatNumber } from '../lib/format'

export interface ActiveUsersTileProps {
  activeUsersCount?: number
}

const ActiveUsersTile = ({ activeUsersCount }: ActiveUsersTileProps) => {
  // Loading state: Skeleton screen
  if (activeUsersCount === undefined) {
    return (
      <div className="bg-primary shadow-default col-span-full flex h-min w-full items-stretch justify-start gap-y-1 gap-x-3 rounded-xl p-4 sm:gap-x-5 xl:col-span-3 xl:flex-col xl:gap-y-3">
        <span className="flex animate-pulse items-center gap-x-2">
          <span className="bg-loading relative flex h-3 w-3 rounded-full" />
          <span className="bg-loading h-4 w-8" />
        </span>
        <span className="font-inter flex animate-pulse gap-x-1 gap-y-1 xl:flex-col">
          <span className="bg-loading h-6 w-52 xl:h-10 xl:w-40" />
          <span className="bg-loading hidden xl:block xl:h-6 xl:w-44" />
        </span>
      </div>
    )
  }

  const label: [string, string] = useMemo(() => {
    const formattedNumber = formatNumber({ value: activeUsersCount, compact: true })
    const isPlural = activeUsersCount !== 1

    return [`${formattedNumber} visitor${isPlural ? 's' : ''}`, `${isPlural ? 'are' : 'is'} online right now`]
  }, [activeUsersCount])

  return (
    <div className="bg-primary shadow-default col-span-full flex h-min w-full items-stretch justify-start gap-y-1 gap-x-3 rounded-xl p-4 sm:gap-x-4 xl:col-span-3 xl:flex-col xl:gap-y-3">
      <span className="flex items-center gap-x-2">
        <span className="relative flex h-3 w-3">
          <span className="bg-confirm animate-ping-slow absolute inline-flex h-full w-full rounded-full opacity-75 "></span>
          <span className="bg-confirm relative inline-flex h-3 w-3 rounded-full"></span>
        </span>
        <p className="font-inter text-sm">Live</p>
      </span>
      <span className="font-inter flex gap-x-1 xl:flex-col">
        <h3 className="xl:font-pt-sans text-base font-bold xl:text-3xl">{label[0]}</h3>
        <p className="font-inter text-base font-normal">{label[1]}</p>
      </span>
    </div>
  )
}
export default ActiveUsersTile
