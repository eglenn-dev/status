import '@mantine/core/styles.css'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme } from '@mantine/core'
import NoSsr from '@/components/NoSsr'

const theme = createTheme({
  colors: {
    dark: [
      '#ffffff',
      '#f0f0f0',
      '#e0e0e0',
      '#d0d0d0',
      '#c0c0c0',
      '#b0b0b0',
      '#a0a0a0',
      '#909090',
      '#808080',
      '#0a0a0a',
    ],
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
          <Component {...pageProps} />
        </div>
      </MantineProvider>
    </NoSsr>
  )
}
