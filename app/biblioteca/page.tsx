import { PROGRAMS } from "@/lib/site";
import ProgramCard from "@/components/program-card";

export default function BibliotecaPage() {
  const items = PROGRAMS.filter(p => p.category === "BIBLIOTECA");
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Biblioteca (de recursos)</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => <ProgramCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
