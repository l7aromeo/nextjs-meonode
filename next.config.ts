import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true, // React 19: Enable React 19 features
  productionBrowserSourceMaps: false, // Security: Disable source maps in production to prevent code exposure
  compiler: {
    emotion: true,
  },
}

export default nextConfig
