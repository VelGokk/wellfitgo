// components/programs.tsx
import { SITE, featuredOnHome, PROGRAMS } from "@/lib/site";
import ProgramCard from "./program-card";

export default function Programs() {
  const featured = featuredOnHome(SITE.home.featuredPrograms);
  const biblioteca = PROGRAMS.filter((p) => p.category === "BIBLIOTECA");

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-[var(--color-primary)]">Programas destacados</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((p) => (
          <ProgramCard key={p.id} p={p} />
        ))}
      </div>

      <div id="biblioteca" className="mt-16 rounded-2xl bg-white p-6 shadow-md border border-gray-200">
        <h4 className="font-extrabold text-lg text-[var(--color-primary)]">Biblioteca (de recursos)</h4>
        <p className="text-gray-700 mt-2">Guías, retos y recursos para acompañar tus rutinas.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {biblioteca.map((p) => (
            <ProgramCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
