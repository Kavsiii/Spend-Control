import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spend Control",
    short_name: "SpendControl",
    description: "Proactive Personal Financial Intelligence",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
