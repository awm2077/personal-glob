/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverExternalPackages: ["postgres"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "postgres"];
    }
    return config;
  },
};

module.exports = nextConfig;
