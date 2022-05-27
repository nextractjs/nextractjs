import '../tailwind.css'
import 'nextra-theme-docs/style.css'
import '../styles.css'

import { NextractProvider } from 'nextract/client'
import { SSRProvider } from '@react-aria/ssr'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/pt-sans/400.css'
import '@fontsource/pt-sans/700.css'

export default function Nextract({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <SSRProvider>
      <NextractProvider isDebug={process.env.NODE_ENV !== 'production'}>
        <Component {...pageProps} />
      </NextractProvider>
    </SSRProvider>,
  )
}
