import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Rewrites proxy /api requests to your Express backend
  // This means the frontend and backend share the same domain
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
