import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ask-izy",
        destination: "/core",
        permanent: true,
      },
      {
        source: "/premium-access",
        destination: "/pricing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
