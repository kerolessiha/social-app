import { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        // port: '',
        pathname: '/uploads/**',
        // search: '',
      },
    ],
  },
}
 
export default config