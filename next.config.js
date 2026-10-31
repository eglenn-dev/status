/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The status page is exported as static files and served by Cloudflare Pages.
  // Dynamic parts (state API, password protection) live in Pages Functions under `functions/`.
  output: 'export',
}

if (process.env.NODE_ENV === 'development') {
  // `next dev` has no Cloudflare bindings, so forward API calls to `npm run preview` (wrangler pages dev)
  nextConfig.rewrites = async () => [
    { source: '/api/:path*', destination: 'http://localhost:8788/api/:path*' },
  ]
}

module.exports = nextConfig
