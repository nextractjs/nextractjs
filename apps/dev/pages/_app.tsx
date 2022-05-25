import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { NextractProvider } from 'nextract/client'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NextractProvider trackLocalhost isDebug exclude={['/analytics']}>
      <Component {...pageProps} />
    </NextractProvider>
  )
}

export default MyApp
