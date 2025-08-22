import HeroMedia from "@/components/heromedia";

export default function Hero() {
  // 🔧 Config rápido: esto después puede venir de un CMS/DB (Sanity, WP, etc.)
  const media:
    | { kind: "image"; src: string; alt?: string }
    | { kind: "youtube"; id?: string; url?: string; alt?: string }
    | { kind: "video"; src: string; poster?: string; alt?: string } = {
    // ⇩⇩ Elegí UNO de los tres y comentá los otros ⇩⇩

    // 1) IMAGEN
    // kind: "image",
    // src: "https://images.unsplash.com/photo-1534367610401-9f51d2d25f10?q=80&w=1400&auto=format&fit=crop",
    // alt: "Portada WellFitGo",

    // 2) YOUTUBE (id o url)
    kind: "youtube",
    id: "MUaXu3rM7Uk",

    // 3) VIDEO MP4 PROPIO
    // kind: "video",
    // src: "/videos/intro.mp4", // guarda el archivo en /public/videos/intro.mp4
    // poster: "/videos/poster.jpg",
  };

  return (
    <header className="bg-[#fbf5f8]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <p className="uppercase tracking-widest font-extrabold text-[#F7B5CD]">
            Nueva edición
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold">WellFitGo</h1>
          <p className="mt-4 text-lg text-neutral-700 leading-relaxed">
            Programas, retos y recursos para transformar tus hábitos. Esta landing es solo la parte visual:
            desde aquí te derivamos a nuestra <strong>tienda</strong>, a los <strong>descargables</strong> y a otras secciones clave.
            Sin precios, sin fricción.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#programas"
              className="px-6 py-3 rounded-full bg-[#F7B5CD] text-[#231F20] font-extrabold text-center shadow hover:brightness-95"
            >
              Explorar Programas
            </a>
            <a
              href="#descargables"
              className="px-6 py-3 rounded-full bg-[#231F20] text-white font-extrabold text-center hover:opacity-90"
            >
              Descargables
            </a>
            
          </div>
        </div>

        {/* Columna de media (imagen / YouTube / MP4) */}
        <HeroMedia media={media as any} />
      </div>
    </header>
  );
}
