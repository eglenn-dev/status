import { workerConfig } from '../../uptime.config'
import { MonitorState } from '../../types/config'

export const onRequest: PagesFunction<Env> = async ({ env }) => {
  const { UPTIMEFLARE_STATE } = env

  const stateStr = await UPTIMEFLARE_STATE?.get('state')
  if (!stateStr) {
    return new Response(JSON.stringify({ error: 'No data available' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  const state = JSON.parse(stateStr) as unknown as MonitorState

  let monitors: any = {}

  for (let monitor of workerConfig.monitors) {
    // Not checked yet, e.g. a new monitor waiting for its first check window
    if (!state.incident[monitor.id] || !state.latency[monitor.id]?.recent.length) continue

    const isUp = state.incident[monitor.id].slice(-1)[0].end !== undefined
    monitors[monitor.id] = {
      up: isUp,
      latency: state.latency[monitor.id].recent.slice(-1)[0].ping,
      location: state.latency[monitor.id].recent.slice(-1)[0].loc,
      message: isUp ? 'OK' : state.incident[monitor.id].slice(-1)[0].error.slice(-1)[0],
    }
  }

  let ret = {
    up: state.overallUp,
    down: state.overallDown,
    updatedAt: state.lastUpdate,
    monitors: monitors,
  }

  return new Response(JSON.stringify(ret), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
