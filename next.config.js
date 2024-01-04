/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com", "lh3.googleusercontent.com", "i.pravatar.cc"],
  },
  // loaders: [
  //   {
  //     test: /\.json$/,
  //     loader: "json-loader",
  //   },
  // ],
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
