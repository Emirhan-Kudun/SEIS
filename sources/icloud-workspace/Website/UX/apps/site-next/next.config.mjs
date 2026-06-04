import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net"
      }
    ]
  },
  turbopack: {
    root: workspaceRoot
  },
  transpilePackages: ["@seis/content", "@seis/runtime"],
  poweredByHeader: false
};

export default nextConfig;
