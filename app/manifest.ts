import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lingo Clips",
    short_name: "Lingo Clips",
    description:
      "LingoClips is an app that helps you learn languages through video clips.",
    start_url: "/splash",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
