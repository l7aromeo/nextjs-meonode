import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // React 19: Enable React 19 features
  reactCompiler: true,

  // Security: Disable source maps in production to prevent code exposure
  productionBrowserSourceMaps: false,

  // Image optimization: Define allowed domains and security policies
  images: {
    remotePatterns: [{ hostname: '*' }],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 85, 95, 100],
  },
  // Emotion CSS-in-JS support
  compiler: {
    emotion: true,
  },
  // Performance: Optimize package imports for faster builds
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@meonode/ui', '@meonode/mui', 'notistack'],
  },
  // Development: Disable overlay indicators
  devIndicators: false,
  webpack: (config, { dev }) => {
    // Source maps: Development only for security
    config.devtool = dev ? config.devtool : false

    // Production optimization: Reduce eval usage
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      }
    }

    return config
  },
}

export default nextConfig
