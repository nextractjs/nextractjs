const defaultSansSerifStack = ['"ui-sans-serif"', '"system-ui"', '"-apple-system"', '"BlinkMacSystemFont"', '"Segoe UI"', '"Roboto"', '"Helvetica Neue"', '"Arial"', '"Noto Sans"', '"sans-serif"', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"']

module.exports = {
    jit: true,
    theme: {
      colors: {
        'accent': '#274C77',
        'warning':'#D64045',
        'confirm': '#0EAD69',
        'background': '#F0F5FA',
        'loading': '#eee',
        'primary': 'white',
        'secondary': 'black',
      },
      fontFamily: {
        'inter': ['"Inter"', ...defaultSansSerifStack],
        'pt-sans': ['"PT Sans"', ...defaultSansSerifStack],
      },
      boxShadow: {
        'default': '0px 4px 6px 3px rgba(0, 0, 0, 0.05)'
      },
      extend: {
        screens: {
          'xs': "520px"
        },
        animation: {
          'ping-slow': 'ping-slow 7s cubic-bezier(0, 0, 0.2, 1) infinite -5s'
        },
        keyframes: {
          'ping-slow': {
            '80%': {
              transform: 'scale(1)',
              opacity: '1'
            },
            '85%, 100%': {
              transform: 'scale(2)',
              opacity: '0'
            }
          }
        }
      },
    },
    plugins: [],
  }
  