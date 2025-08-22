type Card = { pill: string; title: string; copy: string; href: string };

const items: Card[] = [
  {
    pill: "Principiante",
    title: "Empieza desde 0",
    copy:
      "Base técnica y progresión segura. Fortalece hábitos y gana confianza semana a semana.",
    href: "https://tu-tienda.com/plan-principiante",
  },
  {
    pill: "Pérdida de Peso",
    title: "Slim Power Plan",
    copy:
      "Entrenamiento + guías de alimentación para reducir grasa de forma sostenible.",
    href: "https://tu-tienda.com/plan-slim",
  },
  {
    pill: "Masa Muscular",
    title: "Extrem Power Plan",
    copy: "Rutinas de fuerza e hipertrofia con progresiones y calendario claros.",
    href: "https://tu-tienda.com/plan-extrem",
  },
  {
    pill: "Mantenimiento",
    title: "Control Plan",
    copy:
      "Consolida hábitos y sostén tu composición corporal con sesiones inteligentes.",
    href: "https://tu-tienda.com/plan-control",
  },
];

export default function Programs() {
  return (
    <section id="programas" className="py-16 bg-[#f7f7f9]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-8">
          <p className="uppercase tracking-widest font-extrabold text-[#F7B5CD]">
            Planes
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1">
            Programas WellFitGo
          </h2>
          <p className="text-neutral-600 max-w-[760px] mx-auto mt-3">
            Elegí el enfoque que mejor se adapte a tu momento. Cada tarjeta te
            lleva a la ficha en la tienda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <article
              key={it.title}
              className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 flex flex-col"
            >
              <span className="w-max rounded-full border border-[#f2a8c3] bg-[#F7B5CD] px-2.5 py-1 text-xs font-black uppercase tracking-widest text-[#231F20]">
                {it.pill}
              </span>
              <h4 className="mt-3 text-lg font-extrabold tracking-widest uppercase">
                {it.title}
              </h4>
              <p className="mt-2 text-neutral-600">{it.copy}</p>
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-max px-4 py-2.5 rounded-full bg-[#231F20] text-white font-bold hover:opacity-90"
              >
                Ver en Tienda
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
