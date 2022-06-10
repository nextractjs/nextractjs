import Head from 'next/head'
import { Dashboard as NextractDashboard } from 'nextract/client'

const Dashboard = (): JSX.Element => {
  return NextractDashboard({
    apiBasePath: 'https://nextractjs.org/api/nextract',
    dontLoadFonts: true,
    allowedHostnames: ['nextractjs.org'],
  })()
}

const DashboardPage = (): JSX.Element => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Dashboard | Nextract.js</title>
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
      <meta name="og:title" content="Dashboard | Nextract.js" />
      <meta name="description" content="View the analytics data for nextractjs.org" />
      <meta name="og:description" content="View the analytics data for nextractjs.org" />
      <meta name="og:url" content="https://demo.nextractjs.org" />
      <meta property="og:image" content="https://demo.nextractjs.org/og-image.png" />
      <meta property="og:locale" content="en_IE" />
      <meta property="og:site_name" content="Nextract.js Demo" />
    </Head>
    <Dashboard />
  </>
)

export default DashboardPage
