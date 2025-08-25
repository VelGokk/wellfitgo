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
    <main className="max-w-5xl mx-auto py-10 px-2 md:px-8">
      <h1 className="text-4xl font-black mb-10 tracking-tight text-[#8e1dd1]">Dashboard de Configuración</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Colores y tipografía */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-[#f3e6fa]">
          <h2 className="font-bold text-xl mb-2 text-[#8e1dd1] flex items-center gap-2"><span>🎨</span> Colores principales</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(colors).map(([key, val]) => (
              <label key={key} className="flex flex-col gap-1 text-sm">
                <span className="capitalize font-semibold">{key}</span>
                <input type="color" value={val} onChange={e => setColors({ ...colors, [key]: e.target.value })} className="w-10 h-10 rounded-full border-2 border-[#8e1dd1]" />
                <input type="text" value={val} onChange={e => setColors({ ...colors, [key]: e.target.value })} className="border rounded px-2 py-1 text-xs" />
              </label>
            ))}
          </div>
          <h2 className="font-bold text-xl mt-4 mb-2 text-[#8e1dd1] flex items-center gap-2"><span>🔤</span> Tipografía global</h2>
          <input type="text" value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="border rounded px-2 py-1 text-sm" placeholder="Arial, Helvetica, sans-serif" />
          <input type="text" value={fontSize} onChange={e => setFontSize(e.target.value)} className="border rounded px-2 py-1 text-sm" placeholder="16px" />
        </section>
        {/* Landing */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-[#f3e6fa]">
          <h2 className="font-bold text-xl mb-2 text-[#8e1dd1] flex items-center gap-2"><span>🏠</span> Landing principal</h2>
          <input type="text" value={landingTitle} onChange={e => setLandingTitle(e.target.value)} className="w-full border rounded px-2 py-2 text-lg font-semibold" placeholder="Título principal" />
          <textarea value={landingDesc} onChange={e => setLandingDesc(e.target.value)} className="w-full border rounded px-2 py-2 text-base" placeholder="Descripción" />
          <input type="text" value={heroImg} onChange={e => setHeroImg(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="URL imagen principal (Hero)" />
          <input type="text" value={featuredImg} onChange={e => setFeaturedImg(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="URL imagen destacada" />
        </section>
      </div>
      {/* Programas */}
      <section className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-[#f3e6fa]">
        <h2 className="font-bold text-xl mb-4 text-[#8e1dd1] flex items-center gap-2"><span>💪</span> Programas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {programas.map((p, i) => (
            <div key={p.id} className="bg-[#f7f0fa] rounded-xl p-4 flex flex-col gap-2 border border-[#e5d6f7] shadow-sm transition-transform hover:scale-[1.025] hover:shadow-lg animate-fade-in">
              <div className="flex gap-2 items-center">
                <input type="text" value={p.nombre} onChange={e => handleEditPrograma(i, 'nombre', e.target.value)} placeholder="Nombre" className="border rounded px-2 py-1 flex-1 font-semibold focus:ring-2 focus:ring-[#8e1dd1]" />
                <input type="text" value={p.categoria} onChange={e => handleEditPrograma(i, 'categoria', e.target.value)} placeholder="Categoría" className="border rounded px-2 py-1 w-32 focus:ring-2 focus:ring-[#8e1dd1]" />
                <button onClick={() => handleDeletePrograma(i)} className="text-red-500 font-bold text-xs ml-2 hover:underline">Eliminar</button>
              </div>
              <input type="text" value={p.imagen} onChange={e => handleEditPrograma(i, 'imagen', e.target.value)} placeholder="URL imagen" className="border rounded px-2 py-1 focus:ring-2 focus:ring-[#8e1dd1]" />
              <textarea value={p.descripcion} onChange={e => handleEditPrograma(i, 'descripcion', e.target.value)} placeholder="Descripción" className="border rounded px-2 py-1 focus:ring-2 focus:ring-[#8e1dd1]" />
            </div>
          ))}
        </div>
        <button onClick={handleAddPrograma} className="mt-4 bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-6 py-2 rounded-lg font-bold shadow transition">Agregar programa</button>
      </section>
      {/* Recursos */}
      <section className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-[#f3e6fa]">
        <h2 className="font-bold text-xl mb-4 text-[#8e1dd1] flex items-center gap-2"><span>📚</span> Recursos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {recursos.map((r, i) => (
            <div key={r.id} className="bg-[#f7f0fa] rounded-xl p-4 flex flex-col gap-2 border border-[#e5d6f7] shadow-sm transition-transform hover:scale-[1.025] hover:shadow-lg animate-fade-in">
              <div className="flex gap-2 items-center">
                <input type="text" value={r.nombre} onChange={e => handleEditRecurso(i, 'nombre', e.target.value)} placeholder="Nombre" className="border rounded px-2 py-1 flex-1 font-semibold focus:ring-2 focus:ring-[#8e1dd1]" />
                <button onClick={() => handleDeleteRecurso(i)} className="text-red-500 font-bold text-xs ml-2 hover:underline">Eliminar</button>
              </div>
              <input type="text" value={r.url} onChange={e => handleEditRecurso(i, 'url', e.target.value)} placeholder="URL recurso" className="border rounded px-2 py-1 focus:ring-2 focus:ring-[#8e1dd1]" />
              <textarea value={r.descripcion} onChange={e => handleEditRecurso(i, 'descripcion', e.target.value)} placeholder="Descripción" className="border rounded px-2 py-1 focus:ring-2 focus:ring-[#8e1dd1]" />
            </div>
          ))}
        </div>
        <button onClick={handleAddRecurso} className="mt-4 bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-6 py-2 rounded-lg font-bold shadow transition">Agregar recurso</button>
      </section>
      {/* Evaluaciones */}
      <section className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-[#f3e6fa]">
        <h2 className="font-bold text-xl mb-4 text-[#8e1dd1] flex items-center gap-2"><span>📝</span> Evaluaciones</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {evaluaciones.map((ev, i) => (
            <div key={ev.id} className="bg-[#f7f0fa] rounded-xl p-4 flex flex-col gap-2 border border-[#e5d6f7] shadow-sm transition-transform hover:scale-[1.025] hover:shadow-lg animate-fade-in">
              <div className="flex gap-2 items-center">
                <input type="text" value={ev.nombre} onChange={e => handleEditEvaluacion(i, 'nombre', e.target.value)} placeholder="Nombre" className="border rounded px-2 py-1 flex-1 font-semibold focus:ring-2 focus:ring-[#8e1dd1]" />
                <button onClick={() => handleDeleteEvaluacion(i)} className="text-red-500 font-bold text-xs ml-2 hover:underline">Eliminar</button>
              </div>
              <input type="text" value={ev.url} onChange={e => handleEditEvaluacion(i, 'url', e.target.value)} placeholder="URL evaluación" className="border rounded px-2 py-1 focus:ring-2 focus:ring-[#8e1dd1]" />
              <textarea value={ev.descripcion} onChange={e => handleEditEvaluacion(i, 'descripcion', e.target.value)} placeholder="Descripción" className="border rounded px-2 py-1 focus:ring-2 focus:ring-[#8e1dd1]" />
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
        </div>
        <button onClick={handleAddEvaluacion} className="mt-4 bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-6 py-2 rounded-lg font-bold shadow transition">Agregar evaluación</button>
      </section>
      <div className="sticky bottom-0 left-0 w-full flex justify-center py-6 bg-gradient-to-t from-[#f7f0fa] to-transparent z-10">
        <button onClick={handleSave} className="bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl transition-all border-4 border-white">Guardar cambios</button>
      </div>
    </main>
  );
}
