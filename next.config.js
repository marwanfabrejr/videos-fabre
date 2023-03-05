/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'scontent.fcai19-8.fna.fbcdn.net',
    ],
  },
}

module.exports = nextConfig
