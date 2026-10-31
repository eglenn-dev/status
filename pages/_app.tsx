import '@mantine/core/styles.css'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme, v8CssVariablesResolver } from '@mantine/core'
import NoSsr from '@/components/NoSsr'

// Keep the Mantine 7 look after upgrading: its dark palette and translucent "light" variant colors
const theme = createTheme({
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <MantineProvider
        theme={theme}
        cssVariablesResolver={v8CssVariablesResolver}
        defaultColorScheme="auto"
      >
        <Component {...pageProps} />
      </MantineProvider>
    </NoSsr>
  )
}
