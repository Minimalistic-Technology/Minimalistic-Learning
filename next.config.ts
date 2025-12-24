/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'cdn4.vectorstock.com' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'c8.alamy.com' },
      { protocol: 'https', hostname: 'th.bing.com' },
      { protocol: 'https', hostname: 'motionarray.imgix.net' },
      { protocol: 'https', hostname: 'www.shutterstock.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'sidgs.com' },
      { protocol: 'https', hostname: 'pascualbrokers.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'plurilock.com' },
      { protocol: 'https', hostname: 'blog.zegocloud.com' },
      { protocol: 'https', hostname: 'opini.ukwms.ac.id' },
      { protocol: 'https', hostname: 'cdn.mos.cms.futurecdn.net' },
    ],
  },
};

module.exports = nextConfig;
