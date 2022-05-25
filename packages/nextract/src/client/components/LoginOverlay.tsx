import logger from '../../logger'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'

export interface LoginOverlayProps {
  apiBasePath?: string
  onLoggedIn?: () => void
}

const LoginOverlay = ({ apiBasePath, onLoggedIn }: LoginOverlayProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [hasFailed, setHasFailed] = useState(false)

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setHasFailed(false)

    fetch(`${apiBasePath}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          logger.error(
            'FAILED_LOGIN',
            `Failed to login with username: ${username}. Received status code: ${res.status}`,
          )
          setHasFailed(true)
          setPassword('')
          return
        }

        logger.debug('LOGGED_IN', 'Successfully logged in with username:', username)

        onLoggedIn?.()
      })
      .catch((error) => {
        setHasFailed(true)
        setPassword('')
        logger.error('FAILED_LOGIN', 'Failed to login with error:', error)
      })
  }

  return (
    <div className="absolute top-0 left-0 z-50 h-full w-full backdrop-blur-md backdrop-brightness-90">
      <div className="absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-center">
        <div className="bg-primary shadow-default flex w-full flex-col items-stretch justify-start py-10 px-2">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch justify-center gap-y-7">
            <span className="flex flex-col gap-y-6 self-center">
              <div className="mr-auto flex flex-col items-center justify-center">
                <h1 className="font-pt-sans text-accent m-0 text-5xl font-bold">Login</h1>
                <p className="font-inter text-secondary text-md mt-2 font-semibold">
                  Analytics by{' '}
                  <Link href="https://nextractjs.org">
                    <a className="hover:underline" target="_blank">
                      Nextract.js
                    </a>
                  </Link>
                </p>
              </div>
            </span>
            {hasFailed && (
              <span className="bg-warning text-secondary font-inter max-w-sm self-center rounded bg-opacity-30 px-2.5 py-0.5 text-sm font-semibold">
                You entered an invalid username and/or password.
              </span>
            )}
            <form className="w-full max-w-sm space-y-6 self-center" onSubmit={onSubmit}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    className="border-secondary text-secondary focus:border-accent focus:ring-accent relative block w-full appearance-none rounded-none rounded-t-md border border-opacity-20 px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="border-secondary text-secondary focus:border-accent focus:ring-accent relative block w-full appearance-none rounded-none rounded-b-md border border-opacity-20 px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-accent text-primary focus:ring-accent group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginOverlay
