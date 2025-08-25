import { PROGRAMS } from "@/lib/site";
import ProgramCard from "@/components/program-card";

import { SITE } from "@/lib/site";

export default function BibliotecaPage() {
  const items = PROGRAMS.filter(p => p.category === "BIBLIOTECA");
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Biblioteca y Tienda</h1>
      <a
        href={SITE.links.shop}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-8 px-6 py-3 rounded-full font-bold text-lg shadow hover:brightness-95 transition"
        style={{ backgroundColor: "var(--wf-cta)", color: "var(--wf-dark)" }}
      >
        Ir a la Tienda
      </a>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => <ProgramCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
