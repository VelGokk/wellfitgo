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

import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Detectar si estamos en dashboard admin
  const isDashboard = typeof window !== "undefined" && window.location.pathname.startsWith("/admin/dashboard");

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
        {!isDashboard && <Navbar />}
        <div className={isDashboard ? "" : "pt-16"} style={{ backgroundColor: "var(--color-background)" }}>
          {isDashboard && (
            <div className="flex gap-4 p-4 bg-[var(--gray-100)] border-b border-[var(--gray-300)]">
              <a href="/" className="button">Vista previa</a>
              <button className="button" onClick={() => window.history.back()}>Volver</button>
            </div>
          )}
          {children}
        </div>
        {!isDashboard && <Footer />}

        {/* Scripts de analítica configurables desde content/site.json */}
        <Analytics />
        {/* Banner de cookies simple (consent local) */}
        <CookieConsent />
      </body>
    </html>
  );
}
