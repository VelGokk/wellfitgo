// app/evaluaciones/page.tsx
import Link from "next/link";

const CARDS = [
  {
    slug: "escaner-corporal-virtual",
    title: "Escáner Corporal Virtual",
    desc: "Estimación inicial de composición corporal y focos de mejora.",
    img: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#8e1dd1" d="M12 2a7 7 0 0 1 7 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 0 1 7-7Zm0 16c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4Z"/></svg>
    )
  },
  {
    slug: "perfil-nutricional",
    title: "Perfil Nutricional",
    desc: "Chequeo rápido de tus hábitos y preferencias alimentarias.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#8e1dd1" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"/></svg>
    )
  },
  {
    slug: "evaluacion-bienestar",
    title: "Evaluación de Bienestar",
    desc: "Sueño, estrés y energía para un plan equilibrado.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#8e1dd1" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5Z"/></svg>
    )
  },
  {
    slug: "autoevaluacion",
    title: "Autoevaluación",
    desc: "Tu punto de partida y compromisos para 30 días.",
    img: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#8e1dd1" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-7 14H7v-2h5v2Zm5-4H7v-2h10v2Zm0-4H7V7h10v2Z"/></svg>
    )
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
  <div className="mb-8 p-4 rounded-2xl bg-[var(--pink)]/20 border border-[var(--pink)] text-center">
        <p className="font-bold text-lg mb-2">
          ¿Tenés dudas sobre qué evaluación elegir?
        </p>
        <a
          href="https://wa.me/5491112345678?text=Hola%20WellFitGo!%20Quiero%20consultar%20sobre%20las%20evaluaciones."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full font-extrabold text-[var(--color-text)] bg-[#25D366] hover:brightness-95 transition"
        >
          👉 Consultar por WhatsApp
        </a>
      </div>

      {/* HERO */}
      <section className="rounded-3xl p-8 md:p-12 border bg-white border-[var(--color-accent)]">
        <p className="uppercase tracking-widest font-extrabold text-[var(--pink)]">
          Evaluaciones
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold text-[var(--color-primary)]">
          Tu diagnóstico inicial
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed max-w-3xl">
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
            className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#F7B5CD]/40"
            tabIndex={0}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.img}
              alt={c.title}
              className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-5 flex flex-col items-center">
              <div className="mb-2">{c.icon}</div>
              <h3 className="font-extrabold text-lg text-center group-hover:text-[#8e1dd1] transition-colors">{c.title}</h3>
              <p className="text-sm text-neutral-600 mt-1 text-center">{c.desc}</p>
              <span
                className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full text-sm font-bold bg-[#FFE361] text-[#231F20] shadow group-hover:bg-[#F7B5CD] group-hover:text-[#8e1dd1] transition-colors"
                aria-label={`Comenzar ${c.title}`}
              >
                Comenzar
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
