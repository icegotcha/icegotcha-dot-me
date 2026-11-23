import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.icegotcha.me' }],
        destination: 'https://icegotcha.me/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
