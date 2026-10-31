import '@mantine/core/styles.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import {
  CSSVariablesResolver,
  MantineProvider,
  createTheme,
  v8CssVariablesResolver,
} from '@mantine/core'
import NoSsr from '@/components/NoSsr'

const inter = Inter({ subsets: ['latin'] })

// Mirrors the zinc + blue shadcn palette used on ethanglenn.dev
const zinc = [
  '#fafafa',
  '#f4f4f5',
  '#e4e4e7',
  '#d4d4d8',
  '#a1a1aa',
  '#71717a',
  '#52525b',
  '#3f3f46',
  '#27272a',
  '#18181b',
] as const

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  headings: {
    fontFamily: inter.style.fontFamily,
    sizes: {
      h1: { fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.2' },
      h2: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.3' },
    },
  },
  primaryColor: 'blue',
  primaryShade: { light: 7, dark: 8 },
  defaultRadius: 'md',
  radius: {
    xs: '0.2rem',
    sm: '0.325rem',
    md: '0.45rem',
    lg: '0.8rem',
    xl: '1.15rem',
  },
  colors: {
    gray: [...zinc],
    blue: [
      '#eff6ff',
      '#dbeafe',
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6',
      '#2563eb',
      '#1d4ed8',
      '#1e40af',
      '#1e3a8a',
    ],
    dark: [
      '#fafafa',
      '#d4d4d8',
      '#a1a1aa',
      '#71717a',
      '#3f3f46',
      '#27272a',
      '#18181b',
      '#09090b',
      '#050506',
      '#000000',
    ],
  },
})

const cssVariablesResolver: CSSVariablesResolver = (theme) => {
  const base = v8CssVariablesResolver(theme)
  return {
    variables: base.variables,
    light: {
      ...base.light,
      '--mantine-color-body': '#ffffff',
      '--mantine-color-text': '#09090b',
      '--mantine-color-dimmed': '#71717a',
      '--mantine-color-default-border': '#e4e4e7',
      '--app-card': '#ffffff',
      '--app-empty-bar': '#e4e4e7',
    },
    dark: {
      ...base.dark,
      '--mantine-color-body': '#09090b',
      '--mantine-color-text': '#fafafa',
      '--mantine-color-dimmed': '#a1a1aa',
      '--mantine-color-default-border': 'rgba(255, 255, 255, 0.1)',
      '--app-card': '#18181b',
      '--app-empty-bar': '#3f3f46',
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
