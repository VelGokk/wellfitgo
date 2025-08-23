"use client";
import { useEffect, useState } from "react";

const KEY = "wf-cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShow(localStorage.getItem(KEY) !== "1");
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-[420px] z-50 bg-white shadow-lg rounded-2xl p-4 border">
      <div className="text-sm text-neutral-700">
        Usamos cookies para mejorar tu experiencia y medir el uso del sitio.
      </div>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          className="px-3 py-2 rounded border"
          onClick={() => { localStorage.setItem(KEY, "1"); setShow(false); }}
        >
          Rechazar
        </button>
        <button
          className="px-3 py-2 rounded text-white"
          style={{ backgroundColor: "var(--wf-primary)" }}
          onClick={() => { localStorage.setItem(KEY, "1"); setShow(false); }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
