type Item = { title: string; copy: string; href: string; img: string };

const items: Item[] = [
  {
    title: "Plan Celulitis",
    copy:
      "Mejorá el aspecto de tu piel con rutinas y alimentación enfocadas.",
    href: "https://tu-tienda.com/plan-celulitis",
    img:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Plan Menstruación",
    copy:
      "Entrená y alimentate según tu ciclo. Incluye guía y bitácora.",
    href: "https://tu-tienda.com/plan-menstruacion",
    img:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Plan Vegetariano",
    copy: "Transición guiada a una alimentación basada en plantas.",
    href: "https://tu-tienda.com/plan-vegetariano",
    img:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Downloads() {
  return (
    <section id="biblioteca" className="py-16 bg-[#f7f7f9]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-8">
          <p className="uppercase tracking-widest font-extrabold text-[#F7B5CD]">
            Recursos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1">Biblioteca (de recursos)</h2>
          <p className="text-neutral-600 max-w-[760px] mx-auto mt-3">
            Guías, menús, planificadores y herramientas. Cada tarjeta te lleva
            al recurso correspondiente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it) => (
            <article
              key={it.title}
              className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div
                className="aspect-[4/3] w-full"
                style={{
                  backgroundImage: `url('${it.img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="p-5">
                <h6 className="text-lg font-extrabold">{it.title}</h6>
                <p className="mt-2 text-neutral-600">{it.copy}</p>
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2.5 rounded-full bg-[#231F20] text-white font-bold hover:opacity-90"
                >
                  Ver recurso
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
