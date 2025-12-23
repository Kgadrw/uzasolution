/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    // Fix for es-toolkit module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  transpilePackages: ['recharts'],
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
