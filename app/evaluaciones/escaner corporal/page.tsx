
"use client";
import { useState } from "react";
import Head from "next/head";

const actividadOptions = [
  { value: "bajo", label: "Poco ejercicio" },
  { value: "moderado", label: "3-5 días/semana" },
  { value: "alto", label: "6-7 días/semana" }
];

function calcularMetabolismoBasal(sexo: string, peso: number, altura: number, edad: number) {
  // Harris-Benedict
  if (sexo === "femenino") return 655 + (9.56 * peso) + (1.85 * altura) - (4.68 * edad);
  return 66 + (13.75 * peso) + (5 * altura) - (6.75 * edad);
}

function calcularGrasaCorporal(sexo: string, cintura: number, cuello: number, cadera: number, altura: number, edad: number) {
  // Fórmula US Navy
  if (sexo === "femenino") {
    return 495 / (1.29579 - 0.35004 * Math.log10(cintura + cadera - cuello) + 0.221 * Math.log10(altura)) - 450;
  }
  return 495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(altura)) - 450;
}

function caloriasPorActividad(mb: number, actividad: string) {
  if (actividad === "bajo") return { mantener: mb * 1.2, bajar: mb * 1.0 };
  if (actividad === "moderado") return { mantener: mb * 1.55, bajar: mb * 1.3 };
  return { mantener: mb * 1.725, bajar: mb * 1.5 };
}

function getGrasaOMS(sexo: string, edad: number, porcentaje: number) {
  // Tabla OMS
  const tabla = sexo === "femenino"
    ? [
        { min: 20, max: 39, bajo: 21, ideal: 33, alto: 39 },
        { min: 40, max: 59, bajo: 23, ideal: 34, alto: 40 },
        { min: 60, max: 120, bajo: 24, ideal: 36, alto: 42 }
      ]
    : [
        { min: 20, max: 39, bajo: 8, ideal: 20, alto: 25 },
        { min: 40, max: 59, bajo: 11, ideal: 22, alto: 28 },
        { min: 60, max: 120, bajo: 13, ideal: 25, alto: 30 }
      ];
  const grupo = tabla.find(t => edad >= t.min && edad <= t.max) || tabla[0];
  if (porcentaje < grupo.bajo) return "Bajo";
  if (porcentaje <= grupo.ideal) return "Ideal";
  if (porcentaje <= grupo.alto) return "Alto";
  return "Muy alto";
}

export default function EscanerCorporalPage() {
  // Datos personales
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [acepta, setAcepta] = useState(false);
  // Datos físicos
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [cintura, setCintura] = useState("");
  const [cuello, setCuello] = useState("");
  const [cadera, setCadera] = useState("");
  const [actividad, setActividad] = useState("");
  // Resultados
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim() || !email.trim() || !whatsapp.trim() || !sexo || !edad || !altura || !peso || !cintura || !cuello || (sexo === "femenino" && !cadera) || !actividad) {
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
    const edadNum = parseInt(edad);
    const alturaNum = parseFloat(altura.replace(",", "."));
    const pesoNum = parseFloat(peso.replace(",", "."));
    const cinturaNum = parseFloat(cintura.replace(",", "."));
    const cuelloNum = parseFloat(cuello.replace(",", "."));
    const caderaNum = sexo === "femenino" ? parseFloat(cadera.replace(",", ".")) : 0;
    if ([edadNum, alturaNum, pesoNum, cinturaNum, cuelloNum].some(isNaN) || (sexo === "femenino" && isNaN(caderaNum))) {
      setError("Verifica que todos los datos sean válidos.");
      return;
    }
    if (!acepta) {
      setError("Debes aceptar los términos y el descargo de responsabilidad.");
      return;
    }
    setLoading(true);
    // Cálculos
    const imc = pesoNum / Math.pow(alturaNum / 100, 2);
    const mb = calcularMetabolismoBasal(sexo, pesoNum, alturaNum, edadNum);
    const grasa = calcularGrasaCorporal(sexo, cinturaNum, cuelloNum, caderaNum, alturaNum, edadNum);
    const kgGrasa = pesoNum * (grasa / 100);
    const kgMusculo = pesoNum - kgGrasa;
    const proteina = kgMusculo * 1.2;
    const cal = caloriasPorActividad(mb, actividad);
    const grasaOMS = getGrasaOMS(sexo, edadNum, grasa);
    // Guardar en leads
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          whatsapp,
          origen: "escaner-corporal",
          datos: { sexo, edad: edadNum, altura: alturaNum, peso: pesoNum, cintura: cinturaNum, cuello: cuelloNum, cadera: caderaNum, actividad, imc, mb, grasa, kgGrasa, kgMusculo, proteina, cal }
        })
      });
    } catch {}
    setResult({ imc, mb, grasa, kgGrasa, kgMusculo, proteina, cal, grasaOMS, cintura: cinturaNum, sexo, edad: edadNum });
    setEnviado(true);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Escáner Corporal Virtual | WellFitGo</title>
        <meta name="description" content="Calcula tu composición corporal, IMC, metabolismo y recibe una devolución completa basada en la OMS." />
      </Head>
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--bg)] py-16">
        <h1 className="text-3xl font-extrabold text-[var(--color-primary)] mb-4">Escáner Corporal Virtual</h1>
        <p className="text-lg text-gray-700 max-w-xl text-center mb-8">
          Ingresa tus datos y recibe un informe completo de tu composición corporal y recomendaciones según la OMS.
        </p>
  {error && <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>}
        {!enviado ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6 max-w-xl w-full border border-[var(--color-accent)]">
            {/* ...existing code... */}
          </form>
        ) : (
          result && (
            <div className="bg-white rounded-xl shadow p-8 max-w-2xl w-full text-center border border-[var(--color-accent)]">
              <h2 className="text-2xl font-bold mb-2 text-[var(--color-primary)]">Resultados Corporales</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div><b>IMC</b><br/>{result.imc.toFixed(1)}</div>
                <div><b>Metab. Basal</b><br/>{Math.round(result.mb)} Kcal/día</div>
                <div><b>% Grasa</b><br/>{result.grasa.toFixed(1)}</div>
                <div><b>Kg Grasa</b><br/>{result.kgGrasa.toFixed(1)}</div>
                <div><b>Kg Músculo</b><br/>{result.kgMusculo.toFixed(1)}</div>
                <div><b>Proteína diaria</b><br/>{Math.round(result.proteina)} gr</div>
                <div><b>Cintura</b><br/>{result.cintura} cm</div>
                <div><b>Grasa OMS</b><br/>{result.grasaOMS}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[var(--bg)] rounded p-4">
                  <b>Para mantener:</b> {Math.round(result.cal.mantener)} Cal/día<br/>
                  <b>Para bajar:</b> {Math.round(result.cal.bajar)} Cal/día
                </div>
                <div className="bg-[var(--bg)] rounded p-4">
                  <b>Riesgo cintura:</b> {result.sexo === "femenino" ? (result.cintura > 88 ? "Peligro" : result.cintura > 80 ? "Alerta" : "Normal") : (result.cintura > 94 ? "Peligro" : "Normal")}
                  <br/>
                  <span className="text-xs">Mujeres: máx. 80cm (normal), peligro {'>'}88cm. Hombres: máx. 94cm.</span>
                </div>
              </div>
              <div className="mb-4 text-gray-700 text-xs">
                <b>Interpretación OMS % Grasa:</b> Bajo, Ideal, Alto, Muy alto según edad y sexo.<br/>
                <b>IMC:</b> &lt;18.5 Bajo peso | 18.5-24.9 Normal | 25-29.9 Sobrepeso | 30+ Obesidad
              </div>
              <a href="/programas" className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition mt-2">
                Ver programas recomendados
              </a>
            </div>
          )
        )}
      </main>
    </>
  );
}
