/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['studious-guide-9p59xvwrxjr2jvj-3000.app.github.dev']
        }
    }
}

module.exports = nextConfig
