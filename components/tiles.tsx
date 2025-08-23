export default function Tiles() {
  const tiles = [
    {
      title: "Desafío de 5 días",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop",
      href: "/programas"
    },
    {
      title: "Reto 10 días (Maratón)",
      img: "https://images.unsplash.com/photo-1571019613914-85f342c55f86?q=80&w=1400&auto=format&fit=crop",
      href: "/programas"
    },
    {
      title: "Booty Challenge",
      img: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1400&auto=format&fit=crop",
      href: "/programas"
    }
  ];

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-center" style={{ color:"var(--wf-dark)" }}>
        Activá el siguiente nivel
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {tiles.map(t => (
          <a key={t.title} href={t.href}
             className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={t.img} alt={t.title} className="w-full h-56 md:h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0"></div>
            <div className="absolute bottom-3 left-3 text-white font-extrabold">{t.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
