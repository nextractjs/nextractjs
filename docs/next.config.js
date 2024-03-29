const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_flexsearch: true,
  unstable_staticImage: true,
})

module.exports = withNextra({
  experiments: {
    esmExternals: true,
  },
  async redirects() {
    return [
      {
        source: '/docs/changelog',
        permanent: true,
        destination: 'https://github.com/nextractjs/nextractjs/releases',
      },
    ]
  },
})
