import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SmoothScrollProvider from "@/components/smooth_scroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const azonix = localFont({
  src: "../public/font/Azonix.otf",
  variable: "--font-azonix",
  display: "swap",
});

const SITE_TITLE = "Italo Monteiro | Desenvolvedor Full Stack";
const SITE_DESCRIPTION =
  "Portfolio de Italo Monteiro — Desenvolvedor Full Stack e Arquiteto de Software. TypeScript, React, Next.js, Node.js e mais.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/web/favicon.ico", sizes: "any" },
      {
        url: "/icons/web/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/web/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/web/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/icons/web/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icons/web/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    images: [{ url: "/icons/web/icon-512.png", width: 512, height: 512, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/icons/web/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060010" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${azonix.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
