import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              dimensions: false,
              svgoConfig: {
                plugins: [
                  // {
                  //   name: "convertColors",
                  //   params: {
                  //     currentColor: true,
                  //   },
                  // },
                  {
                    name: "removeAttrs",
                    params: {
                      attrs: ["stroke"],
                    },
                  },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            dimensions: false,
            svgoConfig: {
              plugins: [
                // {
                //   name: "convertColors",
                //   params: {
                //     currentColor: true,
                //   },
                // },
                {
                  name: "removeAttrs",
                  params: {
                    attrs: ["stroke"],
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  /* config options here */

  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "https://flow.madras.p-e.kr/api/:path*",
    },
  ],
};

export default withPWA({
  dest: "public",
  disable: false,
  register: true,
  workboxOptions: {
    disableDevLogs: true,
  },
})(nextConfig);
