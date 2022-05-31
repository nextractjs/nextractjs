const defaultSansSerifStack = [
  '"ui-sans-serif"',
  '"system-ui"',
  '"-apple-system"',
  '"BlinkMacSystemFont"',
  '"Segoe UI"',
  '"Roboto"',
  '"Helvetica Neue"',
  '"Arial"',
  '"Noto Sans"',
  '"sans-serif"',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
]

const accentColorChannels = '39, 76, 119'

const colors = {
  accent: `rgb(${accentColorChannels})`,
  warning: '#D64045',
  confirm: '#0EAD69',
  primary: 'white',
  secondary: 'black',
  gray: '#eee',
}

module.exports = {
  jit: true,
  content: [
    './components/**/*.js',
    './components/**/*.tsx',
    './nextra-theme-docs/**/*.js',
    './nextra-theme-docs/**/*.tsx',
    './nextra-theme-docs/**/*.css',
    './pages/**/*.md',
    './pages/**/*.mdx',
    './pages/**/*.tsx',
    './theme.config.js',
    './styles.css',
  ],
  theme: {
    fontFamily: {
      inter: [`"Inter"`, ...defaultSansSerifStack],
      'pt-sans': ['PT Sans', ...defaultSansSerifStack],
    },
    colors,
    extend: {
      backgroundImage: {
        'gradient-radial-from-accent-shadow': `radial-gradient(50% 50% at 50% 50%, rgba(${accentColorChannels}, 0.2) 0%, rgba(${accentColorChannels}, 0) 100%);`,
        logo: 'url(/logo-tile.png)',
      },
      screen: {
        '2xl': { raw: '1440px' },
      },
    },
    plugins: [],
  },
  darkMode: 'class',
}
