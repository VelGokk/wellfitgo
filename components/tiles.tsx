type Tile = { title: string; href: string; img: string };

const tiles: Tile[] = [
  {
    title: "Desafío de 5 días",
    href: "https://tu-tienda.com/reto-5",
    img:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Reto 10 días (Maratón)",
    href: "https://tu-tienda.com/reto-10",
    img:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Booty Challenge",
    href: "https://tu-tienda.com/booty-challenge",
    img:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Tiles() {
  return (
    <section id="retos" className="py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-8">
          <p className="uppercase tracking-widest font-extrabold text-[#F7B5CD]">
            Desafíos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1">
            Activá el siguiente nivel
          </h2>
          <p className="text-neutral-600 max-w-[760px] mx-auto mt-3">
            Sprints cortos para reforzar constancia. Cada reto deriva a su
            página/colección.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiles.map((t) => (
            <article
              key={t.title}
              className="relative rounded-2xl overflow-hidden min-h-[260px]"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${t.img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
              <div className="relative z-10 h-full flex items-end">
                <div className="p-5 text-white">
                  <h5 className="text-lg md:text-xl font-extrabold">{t.title}</h5>
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2.5 rounded-full bg-white text-black font-bold hover:bg-neutral-100"
                  >
                    ¡Empezar!
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
