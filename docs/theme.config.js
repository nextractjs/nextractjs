import { useRouter } from 'next/router'
import { Footer } from './components/Footer'
import Logo from './components/Logo'

const theme = {
  github: 'https://github.com/nextractjs/nextractjs',
  npm: 'https://www.npmjs.com/package/nextractjs',
  projectLink: 'https://github.com/nextractjs/nextractjs',
  docsRepositoryBase: 'https://github.com/nextractjs/nextractjs/blob/main/docs/pages',
  titleSuffix: ' | Nextract.js',
  search: true,
  unstable_flexsearch: true,
  unstable_staticImage: true,
  floatTOC: true,
  font: false,
  feedbackLink: 'Feedback? Let us know →',
  darkMode: false,
  logo: () => {
    return (
      <>
        {useRouter().route === '/' ? (
          <Logo.Icon height={32} className="text-secondary" />
        ) : (
          <Logo.Full height={32} className="text-secondary" />
        )}
        <span className="sr-only">Nextract.js</span>
      </>
    )
  },
  head: ({ title, meta, ...props }) => {
    const router = useRouter()
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextractjs" />
        <meta name="twitter:creator" content="@nextractjs" />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={title} />
        <meta name="description" content={meta.description} />
        <meta name="og:description" content={meta.description} />
        <meta name="og:url" content={`https://nextractjs.org${router.asPath}`} />
        <meta property="og:image" content={`https://nextractjs.org${meta.ogImage ?? '/og-image.png'}`} />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="Nextract.js" />
        {meta.noindex && <meta name="robots" content="noindex" />}
      </>
    )
  },
  footerEditLink: () => {
    return 'Edit this page on GitHub'
  },
  footerText: () => {
    return <Footer />
  },
  nextThemes: {
    defaultTheme: 'light',
    forcedTheme: 'light',
  },
}

export default theme
