/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
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
});