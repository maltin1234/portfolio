/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Ensure it's the correct port where Django serves images
        pathname: "/media/images/**", // Adjust based on your media file path
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/chunks/",
            outputPath: "static/chunks/",
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
