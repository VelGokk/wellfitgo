
"use client";
import { useState } from "react";
import Head from "next/head";

const preguntas = [
  "¿Tomas desayuno todos los días?",
  "¿Dirías que tu desayuno es nutritivo?",
  "¿Mantienes un horario regular de las comidas principales?",
  "¿Consumes en su mayoría comidas balanceadas en lugar de comidas rápidas o congeladas?",
  "¿Consumes carne (res / pollo / pescado) que no esté frita la mayoría de veces?",
  "¿Consumes pan integral, arroz integral, pasta integral, etc., en lugar de la pasta común, pan blanco y arroz blanco?",
  "¿Comes pescado al menos 3 veces a la semana?",
  "¿Evitas picar (consumir antojos) entre comidas?",
  "¿Tomas por lo menos 8 vasos de agua al día?",
  "¿Tomas más agua o bebidas bajas en azúcar que otras bebidas como gaseosas, néctares, bebidas envasadas?",
  "¿Tienes la energía y la concentración que necesitas para llevar a cabo tus retos diarios?",
  "¿En tu día a día, te sientes más tranquilo que estresado?",
  "¿Consumes por lo menos 6 porciones de frutas o verduras al día?",
  "¿Conoces la importancia del calcio para la salud y la necesidad de consumir diariamente la cantidad adecuada?",
  "¿Practicas actividad física por lo menos 30 minutos al día, de 3 a 5 días a la semana?",
  "¿Durante la semana realizas actividades de distracción, además de trabajar o encargarte de tu casa?",
  "¿Te mantienes en un peso estable y adecuado?",
  "¿Evitas fumar regularmente?",
  "¿Moderás el consumo de bebidas alcohólicas?",
  "¿Dirías que duermes las horas que necesitas?"
];

function resultadoBienestar(score: number) {
  if (score <= 7) {
    return {
      titulo: "¡Es momento de empezar!",
      texto: "Probablemente no te sientas satisfecho con tu estilo de vida y esto puede afectar tu bienestar. ¿Deseas iniciar el cambio ahora? ¡Recuerda que siempre puedes mejorar!"
    };
  }
  if (score <= 14) {
    return {
      titulo: "¡Tú puedes más!",
      texto: "El resultado muestra que ya tienes el conocimiento y la voluntad de cambio. ¡Disfruta de hacer algunos cambios y mejorar!"
    };
  }
  return {
    titulo: "¡Felicitaciones!",
    texto: "Solo necesitas mantenerte. ¡Parece que ya tienes un estilo de vida muy saludable! Ahora, lo importante es mantener el ritmo."
  };
}

export default function EvaluacionBienestarPage() {
  // Datos personales
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [acepta, setAcepta] = useState(false);
  // Quiz
  const [respuestas, setRespuestas] = useState<("si"|"no")[]>(Array(preguntas.length).fill(""));
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paso, setPaso] = useState<"datos"|"quiz">("datos");

  const handleChange = (idx: number, value: "si"|"no") => {
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
          origen: "evaluacion-bienestar",
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

  const score = respuestas.filter(r => r === "si").length;
  const resultado = resultadoBienestar(score);

  return (
    <>
      <Head>
        <title>Evaluación de Bienestar | WellFitGo</title>
        <meta name="description" content="Evalúa tus hábitos y estilo de vida con este test de bienestar. Descubre tu nivel y recibe recomendaciones personalizadas." />
      </Head>
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fbf5f8] py-16">
        <h1 className="text-3xl font-extrabold text-[#8e1dd1] mb-4">Evaluación de Bienestar</h1>
        <p className="text-lg text-neutral-700 max-w-xl text-center mb-8">
          Conoce más de cerca las pequeñas acciones de la vida cotidiana que afectan tu bienestar y sé capaz de hacer ajustes para lograr grandes cambios. Responde con sinceridad.
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
              {loading ? "Validando..." : "Comenzar evaluación"}
            </button>
          </form>
        )}
        {paso === "quiz" && !enviado && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6 max-w-xl w-full">
            {preguntas.map((preg, idx) => (
              <div key={idx} className="flex items-center justify-between border-b py-3">
                <span className="font-medium text-neutral-700 w-3/4">{idx + 1}. {preg}</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`pregunta-${idx}`}
                      value="si"
                      checked={respuestas[idx] === "si"}
                      onChange={() => handleChange(idx, "si")}
                      required
                    />
                    Sí
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`pregunta-${idx}`}
                      value="no"
                      checked={respuestas[idx] === "no"}
                      onChange={() => handleChange(idx, "no")}
                      required
                    />
                    No
                  </label>
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
            <h2 className="text-2xl font-bold text-[#8e1dd1] mb-4">{resultado.titulo}</h2>
            <p className="text-lg text-neutral-700 mb-4">{resultado.texto}</p>
            <div className="mb-4 text-neutral-600">Respuestas "Sí": <b>{score}</b> de 20</div>
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
