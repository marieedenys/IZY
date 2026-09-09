import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ask-izy",
        destination: "/core",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
