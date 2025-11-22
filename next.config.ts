import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      "gpu.id",
      "bukuacak-9bdcb4ef2605.herokuapp.com",
      "bukuacak.vercel.app",
    ],
  },
};

export default nextConfig;
