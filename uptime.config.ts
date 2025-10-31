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
    '🌐 Web Apps': ['resumly-frontend', 'olin-help', 'marknote-one', 'clipit-one'],
  },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    // Example HTTP Monitor
    // {
    //   // `id` should be unique, history will be kept if the `id` remains constant
    //   id: 'personal-site',
    //   // `name` is used at status page and callback message
    //   name: 'Personal Site',
    //   // `method` should be a valid HTTP Method
    //   method: 'GET',
    //   // `target` is a valid URL
    //   target: 'https://ethanglenn.dev/online',
    //   // [OPTIONAL] `statusPageLink` is ONLY used for clickable link at status page
    //   statusPageLink: 'https://ethanglenn.dev',
    //   // [OPTIONAL] `hideLatencyChart` will hide status page latency chart if set to true
    //   hideLatencyChart: true,
    //   // [OPTIONAL] `expectedCodes` is an array of acceptable HTTP response codes, if not specified, default to 2xx
    //   expectedCodes: [200],
    //   // [OPTIONAL] `timeout` in millisecond, if not specified, default to 10000
    //   timeout: 10000,
    //   // [OPTIONAL] if specified, the response ust contains the keyword to be considered as operational.
    //   responseKeyword: 'Online!',
    // },
    {
      id: 'resumly-frontend',
      name: 'Resumly.pro',
      method: 'GET',
      target: 'https://api.resumly.pro/online',
      statusPageLink: 'https://resumly.pro',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 10000,
      responseKeyword: 'online',
    },
    {
      id: 'olin-help',
      name: 'Olin.help',
      method: 'GET',
      target: 'https://olin.help/api/health',
      statusPageLink: 'https://olin.help',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 10000,
      responseKeyword: 'Online!',
    },
    {
      id: 'marknote-one',
      name: 'MarkNote.one',
      method: 'GET',
      target: 'https://marknote.one/api/online',
      statusPageLink: 'https://marknote.one',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 10000,
      responseKeyword: 'Online!',
    },
    {
      id: 'clipit-one',
      name: 'ClipIt.one',
      method: 'GET',
      target: 'https://clipit.one/api/online',
      statusPageLink: 'https://clipit.one',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 10000,
      responseKeyword: 'Online!',
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
    monitors: ['resumly-frontend'],
    // [Optional] default to "Scheduled Maintenance" if not specified
    title: 'Monthly Maintenance',
    // Description of the maintenance, will be shown at status page
    body: 'Resumly.pro will undergo an outage due to usage limits. We apologize for any inconvenience caused.',
    // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    start: '2025-10-30T00:00:00+08:00',
    // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // if not specified, the maintenance will be considered as on-going
    end: '2025-11-02T00:00:00+08:00',
    // [Optional] color of the maintenance alert at status page, default to "yellow"
    color: 'blue',
  },
]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
