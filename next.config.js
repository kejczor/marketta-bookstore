/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
