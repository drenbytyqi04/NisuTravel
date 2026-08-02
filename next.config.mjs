/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Fotografitë e destinacioneve vijnë nga Unsplash (shih /data/destinations.ts).
    // Kur t'i zëvendësoni me foto tuajat, shtoni hostin përkatës këtu.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
