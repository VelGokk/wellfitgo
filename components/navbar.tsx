// components/navbar.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? "bg-white/80 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1200px] px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ color: "var(--wf-dark)" }}>
          {SITE.brand.name.replace("Go", "")}
          <span style={{ color: "var(--wf-primary)" }}>Go</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/programas" className="text-sm font-medium hover:opacity-80">
            Programas
          </Link>
          <Link href="/evaluaciones" className="text-sm font-medium hover:opacity-80">
            Evaluaciones
          </Link>
          <a href="#descargables" className="text-sm font-medium hover:opacity-80">
            Descargables
          </a>
          <a
            href={SITE.links.shop}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full font-extrabold hover:brightness-95 transition"
            style={{ backgroundColor: "var(--wf-cta)", color: "var(--wf-dark)" }}
          >
            Ir a la Tienda
          </a>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 border border-black/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-3 flex flex-col gap-3">
            <Link href="/programas" onClick={() => setOpen(false)} className="py-2">
              Programas
            </Link>
            <Link href="/evaluaciones" onClick={() => setOpen(false)} className="py-2">
              Evaluaciones
            </Link>
            <a href="#descargables" onClick={() => setOpen(false)} className="py-2">
              Descargables
            </a>
            <a
              href={SITE.links.shop}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-full font-extrabold text-center"
              style={{ backgroundColor: "var(--wf-cta)", color: "var(--wf-dark)" }}
            >
              Ir a la Tienda
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
