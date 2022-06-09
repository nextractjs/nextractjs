import { Database } from './database'
import { NextApiRequest } from 'next'
import { CookieSerializeOptions } from 'next/dist/server/web/types'

export * from './database'

export interface NextractRequest<T extends Record<string, any> = Record<string, string | string[]>>
  extends Omit<NextApiRequest, 'query'> {
  query: T
  options: NextractOptions
  path: string
}

export interface NextractUser {
  username: string
  password: string
}

export interface AuthOptions {
  /**
   * An array of user accounts that are allowed to access the API routes.
   *
   * If this is not provided, the API routes are public.
   */
  users: NextractUser[]
  cookie: {
    /**
     * The name of the cookie
     *
     * @default 'nextract/session'
     */
    name?: string
    /**
     * This is the password that is used to encrypt the cookie. Choose a unique, long and complex password (at least 32 characters).
     */
    password: string
    /**
     * This is the time in seconds that a session will be valid for.
     *
     * @default 86400 (24 hours)
     */
    ttl?: number
    /**
     * This is the options that will be passed to the cookie library.
     * You can see all of them here: https://github.com/jshttp/cookie#options-1.
     *
     * If you want to use "session cookies" (cookies that are deleted when the browser is closed) then you need
     * to pass cookieOptions: { maxAge: undefined }.
     */
    options?: CookieSerializeOptions
  }
}

export interface NextractOptions {
  /**
   * The database to use for storing events.
   *
   * This needs to be one of the official database adapters or a compatible third-party implementation.
   */
  database: Database
  /**
   * The debug mode that determines if Nextract.js should log development events to the console.
   *
   * @default false
   */
  isDebug?: boolean
  /**
     * Nextract.js stats and API routes are public by default. If you want to restrict access to the API routes and require a password, you can set up the authorization here.
     
      If this it not provided, the API routes are public.
    */
  authOptions?: AuthOptions
  /**
   * The origins (hostnames) the Nextract.js Dashboard will be hosted under.
   *
   * If you don't use Nextract.js across multiple domains/hostnames, this options doesn't affect you.
   */
  allowedOrigins?: 'all' | string[]
}

export interface EventPayload {
  [key: string]: any
}

export interface EventBase {
  id: string
  name: string
  hostname: string
  pathname: string
  userId: string
  timestamp: number
  isPageview: boolean
}

export interface PageviewEventBase {
  referrer?: string
  utmMedium?: string
  utmSource?: string
  utmCampaign?: string
}

export interface AnalyticsEvent extends EventBase, PageviewEventBase {
  payload: EventPayload
  [key: string]: any
}
