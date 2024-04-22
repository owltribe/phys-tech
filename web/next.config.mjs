/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['science-services.fra1.digitaloceanspaces.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'science-services.fra1.digitaloceanspaces.com',
        port: '',
        pathname: '**',
      },
    ]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
