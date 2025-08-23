"use client";
import { useMemo, useState, useEffect } from "react";
import { CATEGORIES, byCategory } from "@/lib/site";
import ProgramCard from "@/components/program-card";

export default function ProgramasPage() {
  const [cat, setCat] = useState<string>("Todos");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("cat");
    if (c && CATEGORIES.includes(c)) setCat(c);
  }, []);

  const items = useMemo(() => byCategory(cat), [cat]);

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Todos los Programas</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(c => (
          <a key={c}
             href={`/programas?cat=${encodeURIComponent(c)}`}
             onClick={e => { e.preventDefault(); setCat(c); history.replaceState(null, "", `?cat=${encodeURIComponent(c)}`); }}
             className={`px-4 py-2 rounded-full border text-sm font-bold ${cat===c?"text-white":""}`}
             style={{ backgroundColor: cat===c?"var(--wf-primary)":"transparent", borderColor: "var(--wf-primary)" }}>
            {c}
          </a>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => <ProgramCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
