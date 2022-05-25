import { ApiClientOptions } from '../types'
import { useEffect, useState } from 'react'
import getCSS from '../../css'
import withFonts from '../lib/withFonts'
import DashboardContents from './DashboardContents'

interface DashboardProps extends ApiClientOptions {
  /**
   * The Nextract.js Dashboard uses [Google Fonts](https://fonts.google.com/) to load external fonts. If you don't want to use Google Fonts, you can disable this by setting this to `true`.
   *
   * @default false
   */
  dontLoadFonts?: boolean
  /**
   * The hostnames that this dashboard should show the analytics data for.
   *
   * If you use the same database for multiple domains, you can use this to only show the analytics data for a specific domain.
   */
  allowedHostnames?: string[]
}

const CSS = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted || typeof window === 'undefined') return null

  return <style>{getCSS()}</style>
}

const Dashboard = (props: DashboardProps) => {
  return (
    <>
      <CSS />
      <div className="bg-background relative flex min-h-screen flex-col items-stretch py-20 px-4 md:px-16 2xl:px-44">
        <DashboardContents {...props} />
      </div>
    </>
  )
}

const DashboardWithFonts = withFonts(Dashboard)

const getDashboard = (props?: DashboardProps) => {
  return () => <DashboardWithFonts {...props} isDisabled={props?.dontLoadFonts ?? false} />
}

export { getDashboard as Dashboard }
export type { DashboardProps }
