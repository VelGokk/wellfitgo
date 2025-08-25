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
        scrolled ? "bg-[var(--white)]/90 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1200px] px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-2xl tracking-tight" style={{ color: "var(--color-primary)" }}>
          {SITE.brand.name.replace("Go", "")}
          <span style={{ color: "var(--color-secondary)" }}>Go</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="/descargo/programas"
            className="text-base font-semibold hover:text-[var(--color-secondary)] transition-colors"
          >
            Programas
          </a>
          <Link href="/evaluaciones" className="text-base font-semibold hover:text-[var(--color-secondary)] transition-colors">
            Evaluaciones
          </Link>
          <a
            href="https://www.wellfitgo.com/category/recetarios-guias-ebooks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold hover:text-[var(--color-secondary)] transition-colors"
            aria-label="Ir a la biblioteca de recursos en tienda WellFitGo"
          >
            Biblioteca
          </a>
          <a href="https://instagram.com/wellfitgo" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ml-2">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
          </a>
          <a href="https://wa.me/5491130085655" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="ml-2">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.52-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.366.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          </a>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 border border-[var(--pink-600)] bg-[var(--white)]/90 shadow-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span className="text-2xl">☰</span>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-[var(--white)]/95 backdrop-blur">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-3 flex flex-col gap-3">
            <a
              href="/descargo/programas"
              onClick={() => setOpen(false)}
              className="py-2 text-base font-semibold hover:text-[var(--color-secondary)]"
            >
              Programas
            </a>
            <Link href="/evaluaciones" onClick={() => setOpen(false)} className="py-2 text-base font-semibold hover:text-[var(--color-secondary)]">
              Evaluaciones
            </Link>
            <a
              href="https://www.wellfitgo.com/category/recetarios-guias-ebooks"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="py-2 text-base font-semibold hover:text-[var(--color-secondary)]"
              aria-label="Ir a la biblioteca de recursos en tienda WellFitGo"
            >
              Biblioteca
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
