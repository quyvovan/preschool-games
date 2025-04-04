/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    outputStandalone: true,
  },
  images: {
    minimumCacheTTL: 60, // cache image 60 seconds
    domains: ['i.pravatar.cc', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // ✅ Đúng: hostname là chuỗi
        port: '', // (Tùy chọn)
        pathname: '/**', // (Tùy chọn)
      },
    ],
  },
  i18n: {
    locales: ['en', 'vi', 'ko'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  eslint: {
    dirs: ['pages', 'src', 'state'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
