import Link from 'next/link'
import Logo from './Logo'

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }): JSX.Element => {
  const classes = 'text-sm text-secondary/60 inter no-underline hover:!text-secondary transition'
  if (href.startsWith('http')) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  )
}

const FooterHeader = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <h3 className="text-secondary text-sm font-medium">{children}</h3>
}

const navigation = {
  about: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Releases', href: 'https://github.com/nextractjs/nextractjs/releases' },
  ],
  install: [
    {
      name: 'Getting started',
      href: '/docs/getting-started',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/nextractjs/nextractjs',
    },
    {
      name: 'NPM',
      href: 'https://www.npmjs.com/package/nextract',
    },
  ],
  links: [
    {
      name: 'Why Nextract.js is better',
      href: '/docs/compare',
    },
    {
      name: 'vs Google Analytics',
      href: '/docs/compare#google-analytics',
    },
    {
      name: 'vs Matomo',
      href: '/docs/compare#matomo',
    },
    {
      name: 'vs Plausible',
      href: '/docs/compare#plausible',
    },
  ],
  legal: [
    { name: 'Imprint', href: '/imprint' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'License', href: 'https://github.com/nextractjs/nextractjs/blob/main/LICENSE' },
  ],
}

const Footer = (): JSX.Element => {
  return (
    <footer
      className="mx-auto w-screen max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-8">
        <div className="flex flex-col-reverse gap-y-16 xl:!grid xl:!grid-cols-4 xl:!gap-16">
          <div>
            <Logo.Full height={32} className="text-secondary" />
            <p>
              MIT {new Date().getFullYear()} &copy;{' '}
              <a className="text-secondary" href="https://twitter.com/zunkp" target="_blank" rel="noreferrer">
                Sönke Peters
              </a>
              .
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 xl:!col-span-3">
            <div className="md:!grid md:!grid-cols-2 md:!gap-8">
              <div>
                <FooterHeader>About</FooterHeader>
                <ul role="list" className="mt-4 ml-0 list-none space-y-1.5">
                  {navigation.about.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Install</FooterHeader>
                <ul role="list" className="mt-4 ml-0 list-none space-y-1.5">
                  {navigation.install.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:!grid md:!grid-cols-2 md:!gap-8">
              <div>
                <FooterHeader>Links</FooterHeader>
                <ul role="list" className="mt-4 ml-0 list-none space-y-1.5">
                  {navigation.links.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Legal</FooterHeader>
                <ul role="list" className="mt-4 ml-0 list-none space-y-1.5">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
