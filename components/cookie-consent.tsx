"use client";
import { useEffect, useState } from "react";

const KEY = "wf-cookie-consent";

type ConsentValue = "accepted" | "rejected" | null;

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState<ConsentValue>(null);


  useEffect(() => {
    if (typeof window === "undefined") return;
    const value = localStorage.getItem(KEY) as ConsentValue;
    setConsent(value);
    setShow(value !== "accepted" && value !== "rejected");
  }, []);


  // Puedes usar consent === "accepted" para habilitar cookies opcionales en tu app

  if (!show) return null;

  return (
  <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-[420px] z-50 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
  <div className="text-sm text-gray-700">
        Usamos cookies para mejorar tu experiencia y medir el uso del sitio. Puedes aceptar o rechazar el uso de cookies no esenciales.
      </div>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          onClick={() => {
            localStorage.setItem(KEY, "rejected");
            setConsent("rejected");
            setShow(false);
          }}
        >
          Rechazar
        </button>
        <button
          className="px-3 py-2 rounded text-white bg-[var(--color-primary)] hover:brightness-95"
          onClick={() => {
            localStorage.setItem(KEY, "accepted");
            setConsent("accepted");
            setShow(false);
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
