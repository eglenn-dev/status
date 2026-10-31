import Head from 'next/head'

import { Inter } from 'next/font/google'
import { MonitorState, MonitorTarget } from '@/types/config'
import { maintenances, pageConfig } from '@/uptime.config'
import OverallStatus from '@/components/OverallStatus'
import Header from '@/components/Header'
import MonitorList from '@/components/MonitorList'
import { Center, Divider, Loader, Text } from '@mantine/core'
import MonitorDetail from '@/components/MonitorDetail'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// State is written to KV by the worker and served by the `functions/api/state.ts` Pages Function
async function fetchState(): Promise<MonitorState | undefined> {
  try {
    const res = await fetch('/api/state', { cache: 'no-store' })
    if (!res.ok) return undefined
    return (await res.json()) as MonitorState
  } catch (e) {
    console.error('Failed to load monitor state', e)
    return undefined
  }
}

export default function Home({
  monitors,
}: {
  monitors: MonitorTarget[]
  tooltip?: string
  statusPageLink?: string
}) {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<MonitorState | undefined>()

  useEffect(() => {
    fetchState().then((s) => {
      setState(s)
      setLoading(false)
    })
  }, [])

  // Specify monitorId in URL hash to view a specific monitor (can be used in iframe)
  const monitorId = window.location.hash.substring(1)
  if (monitorId) {
    if (loading) return null
    const monitor = monitors.find((monitor) => monitor.id === monitorId)
    if (!monitor || !state) {
      return <Text fw={700}>Monitor with id {monitorId} not found!</Text>
    }
    return (
      <div style={{ maxWidth: '810px' }}>
        <MonitorDetail monitor={monitor} state={state} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{pageConfig.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <Header />

        {loading ? (
          <Center mt="xl">
            <Loader />
          </Center>
        ) : state == undefined ? (
          <Center>
            <Text fw={700}>
              Monitor State is not defined now, please check your worker&apos;s status and KV
              binding!
            </Text>
          </Center>
        ) : (
          <div>
            <OverallStatus state={state} monitors={monitors} maintenances={maintenances} />
            <MonitorList monitors={monitors} state={state} />
          </div>
        )}

        <div>
          <Divider mt="lg" />
          <Text
            size="xs"
            mt="xs"
            mb="xs"
            style={{
              textAlign: 'center',
              margin: '30px auto',
            }}
          >
            Open-source monitoring and status page powered by{' '}
            <a href="https://github.com/lyc8503/UptimeFlare" target="_blank">
              Uptimeflare
            </a>
            .
          </Text>
        </div>
      </main>
    </>
  )
}

// Runs at build time only; workerConfig is never included in the client bundle
export async function getStaticProps() {
  const { workerConfig } = await import('@/uptime.config')

  // Only present these values to client
  const monitors = workerConfig.monitors.map((monitor) => {
    return {
      id: monitor.id,
      name: monitor.name,
      // @ts-ignore
      tooltip: monitor?.tooltip,
      // @ts-ignore
      statusPageLink: monitor?.statusPageLink,
      // @ts-ignore
      hideLatencyChart: monitor?.hideLatencyChart,
    }
  })

  // getStaticProps can't serialize `undefined`, so drop unset optional fields
  return { props: { monitors: JSON.parse(JSON.stringify(monitors)) as MonitorTarget[] } }
}
