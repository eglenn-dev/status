import '@mantine/core/styles.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google'
import {
  CSSVariablesResolver,
  MantineProvider,
  createTheme,
  v8CssVariablesResolver,
} from '@mantine/core'
import NoSsr from '@/components/NoSsr'

// Same type stack as ethanglenn.dev: Inter body, Bricolage Grotesque display, JetBrains Mono
const inter = Inter({ subsets: ['latin'] })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

// Warm neutrals and the orange brand accent from ethanglenn.dev's globals.css,
// converted from oklch to hex so Mantine can derive shades from them
const warmGray = [
  '#fcfaf6',
  '#f6f3ee',
  '#e6e2dc',
  '#dfdad2',
  '#a49d93',
  '#686259',
  '#4d473e',
  '#373229',
  '#201b13',
  '#161109',
] as const

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  fontFamilyMonospace: jetbrainsMono.style.fontFamily,
  headings: {
    fontFamily: bricolage.style.fontFamily,
    sizes: {
      h1: {
        fontSize: 'clamp(2rem, 1.4rem + 2vw, 2.75rem)',
        fontWeight: '800',
        lineHeight: '1.05',
      },
      h2: { fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.3' },
    },
  },
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: 'md',
  // Tailwind radii on ethanglenn.dev, derived from --radius: 0.625rem
  radius: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.625rem',
    xl: '0.875rem',
  },
  colors: {
    gray: [...warmGray],
    brand: [
      '#fff2e8',
      '#ffe4cf',
      '#ffccac',
      '#ffaf82',
      '#ff8f57',
      '#fc701f',
      '#ec5500',
      '#cd4805',
      '#a63c0c',
      '#81300f',
    ],
    dark: [
      '#ece6d8',
      '#c2bdb3',
      '#a39e94',
      '#636363',
      '#333333',
      '#1e1e1e',
      '#131313',
      '#0a0a0a',
      '#060606',
      '#020202',
    ],
  },
})

const cssVariablesResolver: CSSVariablesResolver = (theme) => {
  const base = v8CssVariablesResolver(theme)
  return {
    variables: {
      ...base.variables,
      '--app-font-display': bricolage.style.fontFamily,
    },
    light: {
      ...base.light,
      '--mantine-color-body': '#fdfdfd',
      '--mantine-color-text': '#1f1b16',
      '--mantine-color-dimmed': '#696259',
      '--mantine-color-default-border': '#e7e2da',
      '--app-heading': '#171717',
      '--app-card': '#ffffff',
      '--app-muted': '#f5f3f0',
      '--app-empty-bar': '#dfdad1',
      '--app-brand': '#ec5500',
    },
    dark: {
      ...base.dark,
      '--mantine-color-body': '#0a0a0a',
      '--mantine-color-text': '#ece6d8',
      '--mantine-color-dimmed': '#a49e91',
      '--mantine-color-default-border': '#2b2b2b',
      '--app-heading': '#fafafa',
      '--app-card': '#131313',
      '--app-muted': '#191919',
      '--app-empty-bar': '#333333',
      '--app-brand': '#fc701f',
    },
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <MantineProvider
        theme={theme}
        cssVariablesResolver={cssVariablesResolver}
        defaultColorScheme="auto"
      >
        <Component {...pageProps} />
      </MantineProvider>
    </NoSsr>
  )
}
