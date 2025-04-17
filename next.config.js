/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configurações para resolver problemas de carregamento
  webpack: (config, { dev, isServer }) => {
    // Aumentar o timeout para carregamento de chunks
    config.devServer = {
      ...config.devServer,
      hot: true,
      client: {
        overlay: true,
        progress: true,
      },
    };
    return config;
  },
};

module.exports = nextConfig;
