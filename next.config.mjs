import { withNextVideo } from 'next-video/process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withNextVideo(nextConfig);
