/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERCEL_BLOB_API_URL:
      process.env.NEXT_PUBLIC_VERCEL_BLOB_API_URL ?? "https://blob.vercel-storage.com"
  },
  experimental: {
    serverActions: { bodySizeLimit: "20mb" }
  },
  images: { remotePatterns: [] }
};

export default nextConfig;
