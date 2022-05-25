import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="py-0 px-8">
      <Head>
        <title>Nextract.js</title>
        <meta name="description" content="Testing Nextract.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen flex-1 flex-col items-center justify-center py-16 px-0">
        <h1 className="text-secondary font-inter m-0 text-center text-5xl font-bold md:text-7xl">
          Welcome to{' '}
          <a
            href="https://nextractjs.org"
            target="_blank"
            className="text-accent font-pt-sans focus:ring-accent rounded-lg decoration-solid hover:underline focus:outline-none focus:ring-2 active:underline"
            rel="noreferrer"
          >
            Nextract.js
          </a>
        </h1>

        <p className="my-6 text-center text-xl lg:text-2xl">This is a sample application for development.</p>

        <p className="my-6 text-center text-lg lg:text-xl">
          Try to edit the packages in <code className="text-md lg:text-lg">/packages/*</code> and the development
          application at <code className="text-md lg:text-lg">/apps/dev</code>.
        </p>

        <span className="my-6 flex flex-row flex-wrap justify-center gap-2">
          {['/pageA', '/pageB', '/withSSR'].map((path) => (
            <Link href={path} key={path}>
              <a className="border-secondary text-secondary hover:bg-accent focus:ring-accent hover:text-primary mr-2 mb-2 rounded-lg border bg-white py-2.5 px-5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2">
                Go to {path}
              </a>
            </Link>
          ))}
        </span>
      </main>
    </div>
  )
}

export default Home
