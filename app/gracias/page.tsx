"use client";
import { useEffect, useState } from "react";

export default function GraciasPage() {
  const [wa, setWa] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string | null>(null);
  const [recurso, setRecurso] = useState<string | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setWa(p.get("whatsapp"));
    setTipo(p.get("tipo"));
    setNombre(p.get("nombre"));
    setRecurso(p.get("recurso"));
  }, []);

  // Mensaje principal según tipo
  let mainMsg = "¡Gracias! 🎉";
  let subMsg = "Recibimos tu información. Te vamos a contactar a la brevedad.";
  if (tipo === "evaluacion") {
    mainMsg = `¡Gracias${nombre ? ", " + nombre : ""}! 🎉`;
    subMsg = "Recibimos tu evaluación. Pronto tendrás novedades en tu email o WhatsApp.";
  } else if (tipo === "descarga") {
    mainMsg = "¡Descarga lista!";
    subMsg = "Tu recurso está disponible para descargar.";
  } else if (tipo === "contacto") {
    mainMsg = "¡Mensaje enviado!";
    subMsg = "Te responderemos lo antes posible.";
  }

  return (
    <main className="mx-auto max-w-[800px] px-6 py-16 text-center">
      <h1 className="text-4xl font-extrabold">{mainMsg}</h1>
      <p className="text-neutral-600 mt-2">{subMsg}</p>

      {/* Acción de descarga si corresponde */}
      {recurso && (
        <a
          href={recurso}
          download
          className="inline-block mt-6 px-6 py-3 rounded-full bg-[#FFE361] text-[#231F20] font-extrabold shadow hover:bg-[#F7B5CD] transition-colors"
        >
          Descargar recurso
        </a>
      )}

      {/* Acción WhatsApp si corresponde */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 ml-2 px-6 py-3 rounded-full text-white font-extrabold bg-[#25D366] hover:brightness-95 transition"
        >
          Escribinos por WhatsApp
        </a>
      )}

      {/* Acciones generales */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="/"
          className="px-6 py-3 rounded-full bg-[#8e1dd1] text-white font-bold shadow hover:bg-[#6c14a0] transition-colors"
        >
          Ir al inicio
        </a>
        <a
          href="/programas"
          className="px-6 py-3 rounded-full bg-[#F7B5CD] text-[#231F20] font-bold shadow hover:bg-[#FFE361] transition-colors"
        >
          Ver programas
        </a>
        <a
          href="/evaluaciones"
          className="px-6 py-3 rounded-full bg-[#FFE361] text-[#231F20] font-bold shadow hover:bg-[#F7B5CD] transition-colors"
        >
          Hacer otra evaluación
        </a>
      </div>
    </main>
  );
}
