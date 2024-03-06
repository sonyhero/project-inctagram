/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/trainee-instagram-api/**',
        protocol: 'https',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
