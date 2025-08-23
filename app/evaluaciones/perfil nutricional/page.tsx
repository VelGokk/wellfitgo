import { notFound } from "next/navigation";
import LeadForm from "@/components/lead-form";
import { byKey } from "@/lib/evaluaciones";

export default function EvalPage({ params }: { params: { slug: string } }) {
  const evalDef = byKey(params.slug);
  if (!evalDef) return notFound();

  return (
    <main className="mx-auto max-w-[900px] px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">{evalDef.title}</h1>
      <p className="text-neutral-600 mt-2">{evalDef.subtitle}</p>

      <div className="mt-8 rounded-2xl border p-6 bg-white">
        <LeadForm formName={`Eval: ${evalDef.title}`} extra={evalDef.questions} />
      </div>
    </main>
  );
}
