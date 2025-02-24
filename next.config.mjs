/** @type {import('next').NextConfig} */
const nextConfig = {
  matcher: ["/"], // Keep your existing matcher if needed

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dhfbvpqqc/**", // Replace with your Cloudinary cloud name
      },
    ],
  },
};

export default nextConfig;
