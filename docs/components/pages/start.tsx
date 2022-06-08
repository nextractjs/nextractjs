import Head from 'next/head'
import * as Code from '../Code'
import Link from 'next/link'
import Icon, { IconName } from '../Icon'

interface Advantage {
  title: string
  points: string[]
  competitor?: {
    name: string
    path: string
  }
  iconName: IconName
}

const Advantages: Advantage[] = [
  {
    title: 'Privacy friendly',
    points: ['Analytics without cookies or tracking', 'Own your data - keep everything in your system'],
    iconName: 'copy',
    competitor: {
      name: 'Google Analytics',
      path: '/docs/compare#google-analytics',
    },
  },
  {
    title: 'Free forever',
    points: ['Absolutely free', '100% open source'],
    iconName: 'creditCard',
    competitor: {
      name: 'Plausible Analytics',
      path: '/docs/compare#plausible',
    },
  },
  {
    title: 'Easily self hosted',
    points: ['Self hosting as easy as it gets', 'Integrates with your Next.js app and does the rest by itself'],
    iconName: 'server',
    competitor: {
      name: 'Matomo Analytics',
      path: '/docs/compare#matomo',
    },
  },
  {
    title: 'Fast & Lightweight',
    points: ['No external script needed', 'Bundled with your Next.js app served at once'],
    iconName: 'fastForward',
  },
]

const apiRouteCode = `import Nextract from "nextract";
import PrismaDatabase from "@nextract/database-prisma";

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default Nextract({
  database: PrismaDatabase(client)
});`

const appCode = `import { NextractProvider } from "nextract/client";

export default function MyApp({ Component, pageProps }) {
  return (
    <NextractProvider>
      <Component {...pageProps} />;
    </NextractProvider>
  );
}
`

const dashboardCode = `import { Dashboard } from "nextract/client";

export default Dashboard();`

const Start = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Nextract.js</title>
        <meta
          name="og:description"
          content="The easiest analytics tool for Next.js: Privacy-friendly, forever free, easily self hosted. Nextract.js seamlessly adds free and privacy friendly web analytics to your Next.js app. Get started now!"
        />
      </Head>
      <div className="mx-auto flex flex-col gap-y-32 px-4 pt-28 pb-24 sm:!pt-36 lg:!px-8">
        {/* Hero */}
        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center pb-24">
          <h1 className="font-pt-sans text-center text-5xl font-extrabold leading-[1.1] tracking-tight sm:!text-6xl lg:!text-7xl xl:!text-[5rem]">
            The <mark>easiest</mark> analytics <br />
            tool for Next.js
          </h1>
          <p className="font-inter max-w-[50ch] text-center text-lg font-normal sm:!text-xl">
            Nextract.js seamlessly adds free and privacy friendly web analytics to your Next.js app{' '}
          </p>
          <span className="mt-10 flex w-full max-w-xs flex-col justify-center gap-4 sm:!max-w-full sm:!flex-row">
            <div className="rounded-md">
              <Link href="/docs/getting-started">
                <a className="hover:!bg-accent/90 bg-accent text-primary flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium no-underline transition duration-200 hover:!scale-[0.99] md:!py-3 md:!px-10">
                  Get started →
                </a>
              </Link>
            </div>
            <div className="rounded-md">
              <a
                href="https://demo.nextractjs.org"
                target="_blank"
                className="hover:!bg-accent/10 bg-primary border-secondary/20 text-secondary flex w-full items-center justify-center rounded-md border px-8 py-3 text-base font-medium no-underline transition duration-200 hover:!scale-[0.99] md:!py-3 md:!px-10"
                rel="noreferrer"
              >
                View demo
              </a>
            </div>
          </span>
          <div className="bg-gradient-radial-from-accent-shadow absolute -z-10 aspect-square h-screen rounded-full" />
        </div>
        {/* Advantages */}
        <div className="mx-auto flex w-full max-w-7xl grid-cols-2 flex-col gap-x-8 gap-y-10 xl:!grid">
          <div className="col-span-1 flex w-full flex-col items-center gap-y-8 xl:!block">
            <span className="space-y-2 text-center xl:!text-left">
              <h3 className="font-inter m-0 p-0 text-3xl font-semibold leading-normal">Analytics without the hassle</h3>
              <p className="leading-normal xl:!mb-10">Zero-config analytics in few lines of code</p>
            </span>
            <Link href="/docs/compare">
              <a className="text-accent block w-fit rounded-md text-base font-medium no-underline transition duration-200 hover:!scale-[0.99]">
                Why Nextract.js is better →
              </a>
            </Link>
          </div>
          <div className="relative col-span-1 mx-auto grid max-w-2xl auto-rows-min items-stretch gap-5 px-5 md:!grid-cols-2 md:!px-0 xl:!max-w-full xl:!gap-20">
            {Advantages.map((advantage, i) => (
              <span className="bg-accent/5 xl:!bg-accent/0 flex flex-col gap-5 rounded-lg p-5 xl:!p-0" key={i}>
                <div className="bg-accent/10 w-fit rotate-12 rounded-full p-2 xl:!rounded">
                  <Icon name={advantage.iconName} className="text-accent h-6 w-6 -rotate-12" />
                </div>
                <h3 className="font-inter text-xl font-semibold leading-normal">{advantage.title}</h3>
                <ul className="flex list-inside list-disc flex-col leading-normal">
                  {advantage.points.map((point, j) => (
                    <li
                      className="font-inter inline-block text-lg font-normal leading-normal before:!absolute before:!list-item"
                      key={j}
                    >
                      <p className="text-secondary/70 ml-5 text-base">{point}</p>
                    </li>
                  ))}
                </ul>
                {advantage.competitor != null && (
                  <Link href={advantage.competitor.path}>
                    <a className="text-accent mt-auto block w-fit rounded-md text-base font-medium no-underline transition duration-200 hover:!scale-[0.99]">
                      Unlike {advantage.competitor.name} →
                    </a>
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl">
          <h3 className="font-inter m-0 p-0 text-center text-3xl font-semibold leading-normal"></h3>
          <div className="col-span-1 flex w-full flex-col items-center gap-y-2 xl:!block">
            <h3 className="font-inter m-0 p-0 text-3xl font-semibold leading-normal">
              Up and running in <mark>a minute</mark>
            </h3>
            <p className="!mt-0 mb-5 leading-normal xl:!mb-10">
              Paste some code, connect to your database and you&apos;re set.
            </p>
          </div>
          <div className="mx-auto mt-10 flex w-full flex-col flex-wrap items-stretch justify-center gap-10 lg:!flex-row">
            <Code.Block language="javascript" filename="/pages/api/nextract/[...nextract].js" code={apiRouteCode} />
            <Code.Block language="jsx" filename="/pages/app.jsx" highlight="5,7" code={appCode} />
            <Code.Block language="jsx" filename="/pages/app.jsx" highlight="5,7" code={dashboardCode} />
          </div>
        </div>
        <div className="bg-accent bg- bg-logo relative z-10 mx-auto flex h-96 w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-lg">
          <h3 className="font-pt-sans text-primary z-20 cursor-text text-center text-5xl font-extrabold leading-[1.1] tracking-tight">
            Ready to get started?
          </h3>
          <p className="font-inter text-primary !mt-2 max-w-[50ch] text-center text-lg font-normal">
            Add Nextract.js to your Next.js apps
          </p>
          <div className="mt-5 rounded-md">
            <Link href="/docs/getting-started">
              <a className="hover:!bg-primary/80 bg-primary text-secondary flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium no-underline transition duration-200 hover:!scale-[0.99] md:!py-3 md:!px-10">
                View documentation →
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Start
