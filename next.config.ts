import type { NextConfig } from 'next';
// @ts-expect-error - next-pwa does not provide TypeScript types
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  // Rewrites proxy /api requests to your Express backend
  // This means the frontend and backend share the same domain
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
};

export default withPWA(nextConfig);
