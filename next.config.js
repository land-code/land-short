/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['shiny-invention-9465j565pwr2x97-3000.github.dev', 'localhost:3000', 'shiny-invention-9465j565pwr2x97.github.dev']
    }
  }
}

module.exports = nextConfig
