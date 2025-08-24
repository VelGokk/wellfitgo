// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";
import Analytics from "@/lib/analytics";
import { SITE } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE.brand.name,
  description: "Programas, retos y recursos para tu bienestar.",
  icons: { icon: SITE.brand.favicon },
  openGraph: {
    title: SITE.brand.name,
    description: "Bienestar que se siente, se vive y se transforma.",
    url: "https://tudominio.com/",
    siteName: "WellFitGo",
    images: [{ url: "/assets/og.jpg", width: 1200, height: 630 }],
    locale: "es_AR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.brand.name,
    description: "Bienestar…",
    images: ["/assets/og.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Performance / PWA-lite */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{}}
      >
        <Navbar />
        {/* padding-top para no tapar el contenido con el navbar fijo */}
        <div className="pt-16" style={{ backgroundColor: "var(--color-background)" }}>
          {children}
        </div>
        <Footer />

        {/* Scripts de analítica configurables desde content/site.json */}
        <Analytics />
        {/* Banner de cookies simple (consent local) */}
        <CookieConsent />
      </body>
    </html>
  );
}
