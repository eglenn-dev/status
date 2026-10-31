// Raw monitor state for the status page, which is a static export and loads it client-side.
// Previously this was embedded in the page by getServerSideProps.
export const onRequest: PagesFunction<Env> = async ({ env }) => {
  // Pass the KV string through as-is, to avoid hitting server-side cpu time limit
  const stateStr = await env.UPTIMEFLARE_STATE?.get('state')
  if (!stateStr) {
    return Response.json({ error: 'No data available' }, { status: 500 })
  }

  return new Response(stateStr, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}
