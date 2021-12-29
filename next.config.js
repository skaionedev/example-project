// /** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // swcMinify: true,
  compress: false,
  images: {
    domains: ['']
  }
}

const PWAPlugin = withPWA({
  pwa: {
    dest: 'public',
    disable: isDev
  }
})

module.exports = withPlugins([PWAPlugin], nextConfig)
