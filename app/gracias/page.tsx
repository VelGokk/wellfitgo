"use client";
import { useEffect, useState } from "react";

export default function GraciasPage() {
  const [wa, setWa] = useState<string | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setWa(p.get("whatsapp"));
  }, []);

  return (
    <main className="mx-auto max-w-[800px] px-6 py-16 text-center">
      <h1 className="text-4xl font-extrabold">¡Gracias! 🎉</h1>
      <p className="text-neutral-600 mt-2">
        Recibimos tu evaluación. Te vamos a contactar a la brevedad.
      </p>

      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer"
           className="inline-block mt-6 px-6 py-3 rounded-full text-white font-extrabold"
           style={{ backgroundColor: "#25D366" }}>
          Escribinos por WhatsApp
        </a>
      )}
    </main>
  );
}
