"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setAtTop(y < 8);

          if (y > lastY && y > 72) {
            setHidden(true);
            setOpen(false);
          } else {
            setHidden(false);
          }

          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wrap = "fixed inset-x-0 top-0 z-50 transition-all duration-300 will-change-transform";
  const translate = hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100";
  const bg = atTop ? "bg-white/0" : "bg-white/80";
  const blur = atTop ? "" : "backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(0,0,0,0.12)] border-b border-white/40";

  return (
    <div className={`${wrap} ${translate}`}>
      <nav className={`mx-auto max-w-[1200px] ${bg} ${blur} px-4 sm:px-6`}>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-[#F7B5CD]" />
            <span className="text-lg font-extrabold tracking-tight text-[#231F20]">
              WellFitGo
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[#231F20]">
            <a href="#programas" className="hover:opacity-70 transition">Programas</a>
            <a href="#retos" className="hover:opacity-70 transition">Retos</a>
            <a href="#descargables" className="hover:opacity-70 transition">Descargables</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://cursos.tudominio.com/login" className="px-4 py-2 rounded-full bg-black/5 text-[#231F20] hover:bg-black/10 transition">
              Iniciar sesión
            </a>
            <a href="https://tu-tienda.com" className="px-5 py-2.5 rounded-full bg-[#F7B5CD] text-[#231F20] font-extrabold hover:brightness-95 transition">
              Empieza ahora
            </a>
          </div>

          <button
            aria-label="Abrir menú"
            onClick={() => setOpen(v => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-black/5"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pb-4 pt-2 flex flex-col gap-2 text-[#231F20]">
            <a href="#programas" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-black/5">Programas</a>
            <a href="#retos" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-black/5">Retos</a>
            <a href="#descargables" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-black/5">Descargables</a>
            <div className="h-px bg-black/10 my-1" />
            <a href="https://cursos.tudominio.com/login" className="rounded-full px-4 py-2 bg-black/5 text-center" onClick={() => setOpen(false)}>Iniciar sesión</a>
            <a href="https://tu-tienda.com" className="rounded-full px-4 py-2 bg-[#F7B5CD] text-[#231F20] font-extrabold text-center" onClick={() => setOpen(false)}>Empieza ahora</a>
          </div>
        </div>
      </nav>
    </div>
  );
}
