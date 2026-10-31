declare global {
  // Bindings available to Pages Functions under `functions/`
  interface Env {
    UPTIMEFLARE_STATE: KVNamespace
  }
}

export {}
