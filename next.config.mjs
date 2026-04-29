/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath: isProd ? "/kubra-bilal" : "",
  assetPrefix: isProd ? "/kubra-bilal/" : undefined,
  allowedDevOrigins: ["192.168.1.101"],
};

export default nextConfig;
