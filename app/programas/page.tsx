"use client";
import { useMemo, useState, useEffect } from "react";
import ProgramCard from "@/components/program-card";
import { fetchWixPrograms } from "@/lib/wix";


const DEFAULT_CATEGORIES = ["Todos", "Nutrición", "Entrenamiento", "Bienestar", "Coaching"];

export default function ProgramasPage() {
  const [cat, setCat] = useState<string>("Todos");
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("cat");
    if (c) setCat(c);
    fetchWixPrograms()
      .then(data => setPrograms(data))
      .catch(() => setError("No se pudo cargar la información de WIX"))
      .finally(() => setLoading(false));
  }, []);

  // Extraer categorías únicas de los programas traídos de WIX
  const categories = useMemo(() => {
    const cats = new Set(DEFAULT_CATEGORIES);
    programs.forEach(p => {
      if (p.categoria) cats.add(p.categoria);
    });
    return Array.from(cats);
  }, [programs]);

  // Filtrar programas por categoría
  const items = useMemo(() => {
    if (cat === "Todos") return programs;
    return programs.filter(p => p.categoria === cat);
  }, [cat, programs]);

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Todos los Programas</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(c => (
          <a key={c}
             href={`/programas?cat=${encodeURIComponent(c)}`}
             onClick={e => { e.preventDefault(); setCat(c); history.replaceState(null, "", `?cat=${encodeURIComponent(c)}`); }}
             className={`px-4 py-2 rounded-full border text-sm font-bold ${cat===c?"text-white":""}`}
             style={{ backgroundColor: cat===c?"var(--wf-primary)":"transparent", borderColor: "var(--wf-primary)" }}>
            {c}
          </a>
        ))}
      </div>
      {loading ? (
        <div className="text-center py-12 text-neutral-500">Cargando programas desde WIX...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center text-neutral-500">No hay programas en esta categoría.</div>
          ) : (
            items.map(p => <ProgramCard key={p.id || p._id || p.slug} p={p} />)
          )}
        </div>
      )}
    </main>
  );
}
