import type { MetadataRoute } from "next";

const DESCRIPTION =
  "Portfolio de Italo Monteiro — Desenvolvedor Full Stack e Arquiteto de Software.";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Italo Monteiro | Desenvolvedor Full Stack",
    short_name: "Italo Monteiro",
    description: DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#060010",
    theme_color: "#060010",
    icons: [
      {
        src: "/icons/web/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icons/web/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/web/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/web/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/web/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
