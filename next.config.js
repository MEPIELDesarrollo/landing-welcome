/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  output: 'export',

  allowedDevOrigins: [
    '172.16.101.119',
    '172.19.232.186',
    '172.26.208.1',
    'localhost'
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;