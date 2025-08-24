
"use client";
import { useState } from "react";
import Head from "next/head";

function getIMCResult(imc: number) {
  if (imc < 18.5) return { nivel: "Bajo peso", color: "#fbbf24", texto: "Tu IMC indica bajo peso según la OMS. Consulta a un profesional para evaluar tu estado nutricional." };
  if (imc < 25) return { nivel: "Normal", color: "#22c55e", texto: "¡Felicidades! Tu IMC está en el rango normal según la OMS. Mantén tus hábitos saludables." };
  if (imc < 30) return { nivel: "Sobrepeso", color: "#f59e42", texto: "Tu IMC indica sobrepeso. Considera ajustar tu alimentación y actividad física." };
  return { nivel: "Obesidad", color: "#ef4444", texto: "Tu IMC indica obesidad según la OMS. Es recomendable consultar a un profesional de la salud." };
}

export default function PerfilNutricionalPage() {
  // Datos personales
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [acepta, setAcepta] = useState(false);
  // Datos nutricionales
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imc, setImc] = useState<number|null>(null);
  const [resultado, setResultado] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim() || !email.trim() || !whatsapp.trim() || !peso.trim() || !altura.trim() || !edad.trim() || !sexo.trim()) {
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
    const pesoNum = parseFloat(peso.replace(",", "."));
    const alturaNum = parseFloat(altura.replace(",", "."));
    if (isNaN(pesoNum) || pesoNum < 30 || pesoNum > 300) {
      setError("El peso debe ser un número válido entre 30 y 300 kg.");
      return;
    }
    if (isNaN(alturaNum) || alturaNum < 1.2 || alturaNum > 2.5) {
      setError("La altura debe ser un número válido en metros (ej: 1.70).");
      return;
    }
    if (parseInt(edad) < 10 || parseInt(edad) > 120) {
      setError("La edad debe ser un número válido entre 10 y 120 años.");
      return;
    }
    if (!acepta) {
      setError("Debes aceptar los términos y el descargo de responsabilidad.");
      return;
    }
    setLoading(true);
    // Calcular IMC
    const imcCalc = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalc);
    setResultado(getIMCResult(imcCalc));
    // Guardar en leads
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          whatsapp,
          origen: "perfil-nutricional",
          datos: { peso: pesoNum, altura: alturaNum, edad, sexo, imc: imcCalc }
        })
      });
    } catch {}
    setEnviado(true);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Perfil Nutricional | WellFitGo</title>
        <meta name="description" content="Calcula tu IMC y conoce tu perfil nutricional según la OMS. Recibe recomendaciones personalizadas para tu bienestar." />
      </Head>
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fbf5f8] py-16">
        <h1 className="text-3xl font-extrabold text-[#8e1dd1] mb-4">Perfil Nutricional</h1>
        <p className="text-lg text-neutral-700 max-w-xl text-center mb-8">
          Calcula tu Índice de Masa Corporal (IMC) y recibe una devolución basada en los criterios de la OMS.
        </p>
        {error && <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>}
        {!enviado ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6 max-w-xl w-full">
            {/* ...existing code... */}
          </form>
        ) : (
          resultado && (
            <div className="bg-white rounded-xl shadow p-8 max-w-xl w-full text-center">
              <h2 className="text-2xl font-bold mb-2" style={{ color: resultado.color }}>{resultado.nivel}</h2>
              <div className="mb-2 text-neutral-700">Tu IMC es: <b>{imc?.toFixed(2)}</b></div>
              <p className="text-lg text-neutral-700 mb-4">{resultado.texto}</p>
              <a
                href="/programas"
                className="inline-block bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition"
              >
                Ver programas recomendados
              </a>
            </div>
          )
        )}
      </main>
    </>
  );
}
