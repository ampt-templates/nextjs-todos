import { params } from "@ampt/sdk";

/** @type {import('next').NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: params("AMPT_URL") + "/api/:path*",
      },
    ];
  },
};

export default config;
