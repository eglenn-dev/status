import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: 'Status | Ethan Glenn',
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://ethanglenn.dev', label: 'Home' },
    { link: 'https://github.com/eglenn-dev', label: 'GitHub' },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    'Gospel Help': ['gospel-help-app', 'gospel-help-api'],
  },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    {
      id: 'gospel-help-app',
      name: 'Gospel Help App',
      method: 'GET',
      target: 'https://gospel.help/',
      statusPageLink: 'https://gospel.help',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 10000,
      responseKeyword: 'Gospel Help',
      checkWindow: { start: '09:00', end: '10:00', timeZone: 'America/Denver' },
    },
    {
      id: 'gospel-help-api',
      name: 'Gospel Help API',
      method: 'GET',
      target: 'https://api.gospel.help/',
      statusPageLink: 'https://gospel.help',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 10000,
      responseKeyword: 'Online!',
      checkWindow: { start: '09:00', end: '10:00', timeZone: 'America/Denver' },
    },
  ],
  notification: {},
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
// const maintenances: MaintenanceConfig[] = []
const maintenances: MaintenanceConfig[] = [
  {
    // [Optional] Monitor IDs to be affected by this maintenance
    monitors: ['gospel-help'],
    // [Optional] default to "Scheduled Maintenance" if not specified
    title: 'Monthly Maintenance',
    // Description of the maintenance, will be shown at status page
    body: 'Gospel Help will undergo an outage due to usage limits. We apologize for any inconvenience caused.',
    // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    start: '2026-10-31T00:00:00+08:00',
    // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // if not specified, the maintenance will be considered as on-going
    end: '2026-11-02T00:00:00+08:00',
    // [Optional] color of the maintenance alert at status page, default to "yellow"
    color: 'blue',
  },
]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
