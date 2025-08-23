// app/evaluaciones/page.tsx
import Link from "next/link";

const CARDS = [
  {
    slug: "escaner-corporal-virtual",
    title: "Escáner Corporal Virtual",
    desc: "Estimación inicial de composición corporal y focos de mejora.",
    img: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "perfil-nutricional",
    title: "Perfil Nutricional",
    desc: "Chequeo rápido de tus hábitos y preferencias alimentarias.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "evaluacion-bienestar",
    title: "Evaluación de Bienestar",
    desc: "Sueño, estrés y energía para un plan equilibrado.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "autoevaluacion",
    title: "Autoevaluación",
    desc: "Tu punto de partida y compromisos para 30 días.",
    img: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop"
  }
];

export const metadata = {
  title: "Evaluaciones | WellFitGo",
  description:
    "Elegí tu evaluación: escáner corporal virtual, perfil nutricional, evaluación de bienestar y autoevaluación."
};

export default function EvaluacionesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      {/* BANNER CTA */}
      <div className="mb-8 p-4 rounded-2xl bg-[#F7B5CD]/20 border border-[#F7B5CD] text-center">
        <p className="font-bold text-lg mb-2">
          ¿Tenés dudas sobre qué evaluación elegir?
        </p>
        <a
          href="https://wa.me/5491112345678?text=Hola%20WellFitGo!%20Quiero%20consultar%20sobre%20las%20evaluaciones."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full font-extrabold text-[#231F20] bg-[#25D366] hover:brightness-95 transition"
        >
          👉 Consultar por WhatsApp
        </a>
      </div>

      {/* HERO */}
      <section className="rounded-3xl p-8 md:p-12 border bg-white">
        <p className="uppercase tracking-widest font-extrabold text-[#F7B5CD]">
          Evaluaciones
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">
          Tu diagnóstico inicial
        </h1>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-3xl">
          Completá una evaluación para obtener un panorama claro de tu punto de partida.
          Primero te pedimos <strong>nombre, email y WhatsApp</strong> para enviarte los resultados.
        </p>
      </section>

      {/* GRID */}
      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((c) => (
          <Link
            key={c.slug}
            href={`/evaluaciones/${c.slug}`}
            className="group relative overflow-hidden rounded-3xl border bg-white hover:shadow-xl transition"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.img}
              alt={c.title}
              className="h-44 w-full object-cover group-hover:scale-[1.02] transition"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="font-extrabold text-lg">{c.title}</h3>
              <p className="text-sm text-neutral-600 mt-1">{c.desc}</p>
              <span
                className="inline-block mt-4 px-4 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#FFE361", color: "#231F20" }}
              >
                Comenzar →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
