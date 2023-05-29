/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    domains: ["lh3.googleusercontent.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
