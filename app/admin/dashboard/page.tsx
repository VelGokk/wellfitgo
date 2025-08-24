"use client";
import { useState, useEffect } from "react";
import { getDashboardData, setDashboardData } from "@/lib/dashboard-data";
import { getLeads } from "@/lib/leads";


const DEFAULT_COLORS = {
  primary: "#8e1dd1",
  secondary: "#F7B5CD",
  accent: "#FFE361",
  text: "#231F20",
  background: "#fbf5f8"
};
const DEFAULT_PROGRAMS = [
  { id: 1, nombre: "Programa ejemplo", descripcion: "Descripción breve.", imagen: "", categoria: "Nutrición" }
];
const DEFAULT_RECURSOS = [
  { id: 1, nombre: "Recurso ejemplo", url: "", descripcion: "Descarga gratuita." }
];
const DEFAULT_EVALUACIONES = [
  { id: 1, nombre: "Evaluación ejemplo", descripcion: "Autoevaluación inicial.", url: "" }
];

// Utilidad para agrupar leads por evaluación
type Lead = {
  nombre: string;
  email: string;
  whatsapp: string;
  origen: string;
  quiz?: any;
  datos?: any;
  created_at?: string;
};

type LeadsByEval = Record<string, Lead[]>;

function groupLeadsByEvaluacion(leads: Lead[]): LeadsByEval {
  const grouped: LeadsByEval = {};
  for (const lead of leads) {
    const origen = lead.origen || "otros";
    if (!grouped[origen]) grouped[origen] = [];
    grouped[origen].push(lead);
  }
  return grouped;
}

export default function DashboardPage() {
  // Estado global del dashboard
  const [leads, setLeads] = useState<Lead[]>([]);
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [heroImg, setHeroImg] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [landingTitle, setLandingTitle] = useState("Bienvenido a la Comunidad - Mi Prueba");
  const [landingDesc, setLandingDesc] = useState("Comunidad de bienestar, retos, recursos y programas destacados para tu salud y desarrollo personal.");
  const [programas, setProgramas] = useState(DEFAULT_PROGRAMS);
  const [recursos, setRecursos] = useState(DEFAULT_RECURSOS);
  const [evaluaciones, setEvaluaciones] = useState(DEFAULT_EVALUACIONES);
  // Tipografía y tamaño de fuente
  const [fontFamily, setFontFamily] = useState('Arial, Helvetica, sans-serif');
  const [fontSize, setFontSize] = useState('16px');

  // Cargar datos guardados y leads
  useEffect(() => {
    const data = getDashboardData();
    if (data) {
      setColors(data.colors || DEFAULT_COLORS);
      setHeroImg(data.heroImg || "");
      setFeaturedImg(data.featuredImg || "");
      setLandingTitle(data.landingTitle || "Bienvenido a la Comunidad - Mi Prueba");
      setLandingDesc(data.landingDesc || "Comunidad de bienestar, retos, recursos y programas destacados para tu salud y desarrollo personal.");
      setProgramas(data.programas || DEFAULT_PROGRAMS);
      setRecursos(data.recursos || DEFAULT_RECURSOS);
      setEvaluaciones(data.evaluaciones || DEFAULT_EVALUACIONES);
      setFontFamily(data.fontFamily || 'Arial, Helvetica, sans-serif');
      setFontSize(data.fontSize || '16px');
    }
    // Cargar leads
    setLeads(getLeads());
  }, []);

  // Actualizar variables CSS globales en tiempo real
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.entries(colors).forEach(([key, val]) => {
        document.documentElement.style.setProperty(`--color-${key}`, val);
        if (key === "background") document.documentElement.style.setProperty("--background", val);
        if (key === "text") document.documentElement.style.setProperty("--foreground", val);
      });
      document.documentElement.style.setProperty('--font-family', fontFamily);
      document.documentElement.style.setProperty('--font-size', fontSize);
    }
  }, [colors, fontFamily, fontSize]);

  // Guardar cambios
  const handleSave = () => {
    setDashboardData({
      colors, heroImg, featuredImg, landingTitle, landingDesc, programas, recursos, evaluaciones, fontFamily, fontSize
    });
    alert("Cambios guardados correctamente.");
  };

  // CRUD Programas
  const handleAddPrograma = () => setProgramas([...programas, { id: Date.now(), nombre: "", descripcion: "", imagen: "", categoria: "" }]);
  const handleEditPrograma = (i: number, key: string, val: string) => {
    const arr = [...programas];
    (arr[i] as any)[key] = val;
    setProgramas(arr);
  };
  const handleDeletePrograma = (i: number) => setProgramas(programas.filter((_, idx) => idx !== i));

  // CRUD Recursos
  const handleAddRecurso = () => setRecursos([...recursos, { id: Date.now(), nombre: "", url: "", descripcion: "" }]);
  const handleEditRecurso = (i: number, key: string, val: string) => {
    const arr = [...recursos];
    (arr[i] as any)[key] = val;
    setRecursos(arr);
  };
  const handleDeleteRecurso = (i: number) => setRecursos(recursos.filter((_, idx) => idx !== i));

  // CRUD Evaluaciones
  const handleAddEvaluacion = () => setEvaluaciones([...evaluaciones, { id: Date.now(), nombre: "", descripcion: "", url: "" }]);
  const handleEditEvaluacion = (i: number, key: string, val: string) => {
    const arr = [...evaluaciones];
    (arr[i] as any)[key] = val;
    setEvaluaciones(arr);
  };
  const handleDeleteEvaluacion = (i: number) => setEvaluaciones(evaluaciones.filter((_, idx) => idx !== i));

  // Agrupar leads por evaluación
  const leadsByEval: LeadsByEval = groupLeadsByEvaluacion(leads);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold mb-6">Dashboard de Configuración</h1>
  {/* Colores y tipografía */}
      <section className="mb-8 p-6 bg-white rounded-xl shadow">
        <h2 className="font-bold mb-4 text-lg">Colores principales</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.entries(colors).map(([key, val]) => (
            <label key={key} className="flex flex-col gap-1">
              <span className="capitalize font-semibold">{key}</span>
              <input type="color" value={val} onChange={e => setColors({ ...colors, [key]: e.target.value })} />
              <input type="text" value={val} onChange={e => setColors({ ...colors, [key]: e.target.value })} className="border rounded px-2 py-1 text-sm" />
            </label>
          ))}
        </div>
        <h2 className="font-bold mb-2 text-lg mt-6">Tipografía global</h2>
        <div className="flex flex-col gap-2 mb-2">
          <label className="font-semibold">Fuente</label>
          <input type="text" value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="border rounded px-2 py-1" placeholder="Arial, Helvetica, sans-serif" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Tamaño base</label>
          <input type="text" value={fontSize} onChange={e => setFontSize(e.target.value)} className="border rounded px-2 py-1" placeholder="16px" />
        </div>
      </section>
      {/* Landing */}
      <section className="mb-8 p-6 bg-white rounded-xl shadow">
        <h2 className="font-bold mb-4 text-lg">Landing principal</h2>
        <label className="block mb-2 font-semibold">Título</label>
        <input type="text" value={landingTitle} onChange={e => setLandingTitle(e.target.value)} className="w-full border rounded px-2 py-1 mb-4" />
        <label className="block mb-2 font-semibold">Descripción</label>
        <textarea value={landingDesc} onChange={e => setLandingDesc(e.target.value)} className="w-full border rounded px-2 py-1 mb-4" />
        <label className="block mb-2 font-semibold">Imagen principal (Hero)</label>
        <input type="text" value={heroImg} onChange={e => setHeroImg(e.target.value)} className="w-full border rounded px-2 py-1 mb-4" placeholder="URL de la imagen" />
        <label className="block mb-2 font-semibold">Imagen destacada</label>
        <input type="text" value={featuredImg} onChange={e => setFeaturedImg(e.target.value)} className="w-full border rounded px-2 py-1 mb-4" placeholder="URL de la imagen" />
      </section>
      {/* Programas */}
      <section className="mb-8 p-6 bg-white rounded-xl shadow">
        <h2 className="font-bold mb-4 text-lg">Programas</h2>
        {programas.map((p, i) => (
          <div key={p.id} className="mb-4 border-b pb-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <input type="text" value={p.nombre} onChange={e => handleEditPrograma(i, "nombre", e.target.value)} placeholder="Nombre" className="border rounded px-2 py-1 flex-1" />
              <input type="text" value={p.categoria} onChange={e => handleEditPrograma(i, "categoria", e.target.value)} placeholder="Categoría" className="border rounded px-2 py-1 w-32" />
              <button onClick={() => handleDeletePrograma(i)} className="text-red-500 font-bold">Eliminar</button>
            </div>
            <input type="text" value={p.imagen} onChange={e => handleEditPrograma(i, "imagen", e.target.value)} placeholder="URL imagen" className="border rounded px-2 py-1" />
            <textarea value={p.descripcion} onChange={e => handleEditPrograma(i, "descripcion", e.target.value)} placeholder="Descripción" className="border rounded px-2 py-1" />
          </div>
        ))}
        <button onClick={handleAddPrograma} className="bg-[#8e1dd1] text-white px-4 py-2 rounded font-bold mt-2">Agregar programa</button>
      </section>
      {/* Recursos */}
      <section className="mb-8 p-6 bg-white rounded-xl shadow">
        <h2 className="font-bold mb-4 text-lg">Recursos</h2>
        {recursos.map((r, i) => (
          <div key={r.id} className="mb-4 border-b pb-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <input type="text" value={r.nombre} onChange={e => handleEditRecurso(i, "nombre", e.target.value)} placeholder="Nombre" className="border rounded px-2 py-1 flex-1" />
              <button onClick={() => handleDeleteRecurso(i)} className="text-red-500 font-bold">Eliminar</button>
            </div>
            <input type="text" value={r.url} onChange={e => handleEditRecurso(i, "url", e.target.value)} placeholder="URL recurso" className="border rounded px-2 py-1" />
            <textarea value={r.descripcion} onChange={e => handleEditRecurso(i, "descripcion", e.target.value)} placeholder="Descripción" className="border rounded px-2 py-1" />
          </div>
        ))}
        <button onClick={handleAddRecurso} className="bg-[#8e1dd1] text-white px-4 py-2 rounded font-bold mt-2">Agregar recurso</button>
      </section>
      {/* Evaluaciones */}
      <section className="mb-8 p-6 bg-white rounded-xl shadow">
        <h2 className="font-bold mb-4 text-lg">Evaluaciones</h2>
        {evaluaciones.map((ev, i) => (
          <div key={ev.id} className="mb-4 border-b pb-4 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <input type="text" value={ev.nombre} onChange={e => handleEditEvaluacion(i, "nombre", e.target.value)} placeholder="Nombre" className="border rounded px-2 py-1 flex-1" />
              <button onClick={() => handleDeleteEvaluacion(i)} className="text-red-500 font-bold">Eliminar</button>
            </div>
            <input type="text" value={ev.url} onChange={e => handleEditEvaluacion(i, "url", e.target.value)} placeholder="URL evaluación" className="border rounded px-2 py-1" />
            <textarea value={ev.descripcion} onChange={e => handleEditEvaluacion(i, "descripcion", e.target.value)} placeholder="Descripción" className="border rounded px-2 py-1" />
            {/* Métricas de resultados */}
            <div className="mt-2 text-sm text-neutral-700">
              <b>Respuestas recibidas:</b> {leadsByEval[ev.nombre]?.length || 0}
              {Array.isArray(leadsByEval[ev.nombre]) && leadsByEval[ev.nombre].length > 0 && (
                <details className="mt-1">
                  <summary className="cursor-pointer underline">Ver detalles</summary>
                  <ul className="max-h-40 overflow-y-auto text-xs mt-2">
                    {leadsByEval[ev.nombre].map((lead: Lead, idx: number) => (
                      <li key={idx} className="mb-1 border-b pb-1">
                        <b>{lead.nombre}</b> - {lead.email} - {lead.whatsapp}<br/>
                        <span className="text-neutral-500">{lead.created_at || ""}</span>
                        {lead.quiz && (
                          <div className="mt-1">Respuestas: {JSON.stringify(lead.quiz)}</div>
                        )}
                        {lead.datos && (
                          <div className="mt-1">Datos: {JSON.stringify(lead.datos)}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        ))}
        <button onClick={handleAddEvaluacion} className="bg-[#8e1dd1] text-white px-4 py-2 rounded font-bold mt-2">Agregar evaluación</button>
      </section>
      <button onClick={handleSave} className="bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition w-full">Guardar cambios</button>
    </main>
  );
}
