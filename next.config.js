/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['https://shiny-invention-9465j565pwr2x97.github.dev']
    }
  }
}

module.exports = nextConfig
