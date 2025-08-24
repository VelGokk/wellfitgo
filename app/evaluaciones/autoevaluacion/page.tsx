
"use client";
import { useState } from "react";
import Head from "next/head";

const preguntas = [
  {
    pregunta: "¿Qué te motiva realmente a bajar de peso?",
    opciones: [
      "Mejorar mi salud",
      "Sentirme mejor conmigo mismo/a",
      "Agradar a otros",
      "Otro motivo"
    ]
  },
  {
    pregunta: "¿Qué emoción predomina cuando piensas en tu objetivo?",
    opciones: [
      "Entusiasmo",
      "Miedo",
      "Duda",
      "Esperanza"
    ]
  },
  {
    pregunta: "¿Qué hábito te gustaría transformar primero?",
    opciones: [
      "Alimentación",
      "Actividad física",
      "Gestión emocional",
      "Descanso"
    ]
  },
  {
    pregunta: "¿Qué creencia te limita más en tu proceso?",
    opciones: [
      "No tengo fuerza de voluntad",
      "No tengo tiempo",
      "No es para mí",
      "Ninguna, me siento capaz"
    ]
  },
  {
    pregunta: "¿Qué apoyo sientes que necesitas?",
    opciones: [
      "Acompañamiento profesional",
      "Apoyo familiar/amigos",
      "Herramientas prácticas",
      "Motivación interna"
    ]
  }
];

export default function AutoevaluacionPage() {
  // Datos personales
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [acepta, setAcepta] = useState(false);
  // Quiz
  const [respuestas, setRespuestas] = useState<string[]>(Array(preguntas.length).fill(""));
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paso, setPaso] = useState<"datos"|"quiz">("datos");

  const handleChange = (idx: number, value: string) => {
    const nuevas = [...respuestas];
    nuevas[idx] = value;
    setRespuestas(nuevas);
  };

  // Validar y avanzar al quiz
  const handleDatos = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim() || !email.trim() || !whatsapp.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("El email no es válido.");
      return;
    }
    // Validación básica de WhatsApp (solo números, mínimo 8 dígitos)
    if (!/^\d{8,15}$/.test(whatsapp.replace(/\D/g, ""))) {
      setError("El WhatsApp debe contener solo números y tener entre 8 y 15 dígitos.");
      return;
    }
    if (!acepta) {
      setError("Debes aceptar los términos y el descargo de responsabilidad.");
      return;
    }
    setPaso("quiz");
  };

  // Enviar quiz y datos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          whatsapp,
          origen: "autoevaluacion",
          quiz: respuestas
        })
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Error al guardar tus datos");
        setLoading(false);
        return;
      }
      setEnviado(true);
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // Mensaje motivador simple según respuestas
  const mensajeFinal = () => {
    if (respuestas.includes("No tengo fuerza de voluntad") || respuestas.includes("No tengo tiempo")) {
      return "¡Recuerda que cada pequeño paso cuenta! El primer cambio es creer en ti y pedir ayuda si lo necesitas.";
    }
    if (respuestas.includes("Mejorar mi salud") && respuestas.includes("Motivación interna")) {
      return "¡Tienes un gran motor interno! Aprovecha esa motivación y busca herramientas que te acompañen.";
    }
    return "¡Gracias por autoevaluarte! El autoconocimiento es el primer paso para transformar tus hábitos.";
  };

  return (
    <>
      <Head>
        <title>Autoevaluación de Bienestar | WellFitGo</title>
        <meta name="description" content="Responde este quiz de autoconocimiento y da el primer paso hacia tu bienestar y transformación personal." />
      </Head>
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fbf5f8] py-16">
        <h1 className="text-3xl font-extrabold text-[#8e1dd1] mb-4">Autoevaluación de Bienestar</h1>
        <p className="text-lg text-neutral-700 max-w-xl text-center mb-8">
          Responde estas preguntas para conocerte mejor y dar el primer paso hacia tu bienestar y transformación.
        </p>
  {error && <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>}
        {paso === "datos" && !enviado && (
          <form onSubmit={handleDatos} className="bg-white rounded-xl shadow p-8 space-y-6 max-w-xl w-full">
            <div>
              <label className="block font-bold mb-1">Nombre completo *</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">WhatsApp *</label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{8,15}"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value.replace(/[^\d]/g, ""))}
                className="w-full px-4 py-2 border rounded-lg"
                required
                placeholder="Ej: 1123456789"
                maxLength={15}
              />
              <span className="text-xs text-neutral-500">Solo números, sin espacios ni símbolos.</span>
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={acepta}
                onChange={e => setAcepta(e.target.checked)}
                required
              />
              <span className="text-xs">
                Acepto los <a href="/legal/terminos" target="_blank" className="underline">Términos y Condiciones</a> y el siguiente descargo de responsabilidad:<br/>
                <b>Este test es solo orientativo y no reemplaza el consejo profesional médico o nutricional. La información será utilizada para contactarte y enviarte recursos relacionados con tu bienestar.</b>
              </span>
            </div>
            <button
              type="submit"
              className="bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition w-full disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Validando..." : "Comenzar autoevaluación"}
            </button>
          </form>
        )}
        {paso === "quiz" && !enviado && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6 max-w-xl w-full">
            {preguntas.map((p, idx) => (
              <div key={idx}>
                <div className="font-bold mb-2">{p.pregunta}</div>
                <div className="space-y-1">
                  {p.opciones.map((op, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`pregunta-${idx}`}
                        value={op}
                        checked={respuestas[idx] === op}
                        onChange={() => handleChange(idx, op)}
                        required
                      />
                      {op}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition w-full disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Ver resultado"}
            </button>
          </form>
        )}
        {enviado && (
          <div className="bg-white rounded-xl shadow p-8 max-w-xl w-full text-center">
            <h2 className="text-2xl font-bold text-[#8e1dd1] mb-4">¡Gracias por completar tu autoevaluación!</h2>
            <p className="text-lg text-neutral-700 mb-4">{mensajeFinal()}</p>
            <a
              href="/programas"
              className="inline-block bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition"
            >
              Ver programas recomendados
            </a>
          </div>
        )}
      </main>
    </>
  );
}
