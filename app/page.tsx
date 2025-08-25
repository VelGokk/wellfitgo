
// Hero personalizado inline para reflejar cambios solicitados


import Featured from "@/components/featured";
import Tiles from "@/components/tiles";
import Programs from "@/components/programs";
import WhatsappFloat from "@/components/whatsapp-float";
import HeroMedia from "@/components/heromedia";
import Head from "next/head";
import { getDashboardData } from "@/lib/dashboard-data";

export default function HomePage() {
  // Obtener video desde dashboard
  let heroVideoUrl = "https://www.youtube.com/watch?v=MUu3k3mUrUk";
  try {
    const dash = getDashboardData();
    if (dash && dash.heroImg) heroVideoUrl = dash.heroImg;
  } catch {}
  return (
    <>
      <Head>
        <title>Bienvenido a la Comunidad - Mi Prueba</title>
        <meta name="description" content="Comunidad de bienestar, retos, recursos y programas destacados para tu salud y desarrollo personal." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main role="main" aria-label="Contenido principal">
        <section className="py-16 text-center bg-[var(--color-background)] animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[var(--color-text)] drop-shadow-lg animate-slide-down">WellFitGo</h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8 animate-fade-in-delay">Programas, retos y recursos para transformar tus hábitos. Esta landing es solo la parte visual: desde aquí te derivamos a nuestra tienda, a la biblioteca y a otras secciones clave. Sin precios, sin fricción.</p>
            {/* Video de portada configurable desde el dashboard */}
            <div className="mb-8 animate-fade-in-delay">
              <HeroMedia media={{ kind: "youtube", url: heroVideoUrl, poster: "/videos/poster.jpg", alt: "Intro WellFitGo" }} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
              <a href="/programas-info" className="rounded-full px-10 py-5 font-extrabold text-lg bg-[var(--color-secondary)] text-[var(--color-text)] shadow hover:brightness-95 transition">Programas</a>
              <a href="/biblioteca" className="rounded-full px-10 py-5 font-extrabold text-lg bg-[var(--color-text)] text-white shadow hover:brightness-95 transition">Biblioteca</a>
              <a
                href="https://wa.me/541130085655?text=Hola%20WellFitGo!%20Quiero%20saber%20m%C3%A1s%20sobre%20los%20programas.%20%F0%9F%98%8A"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-10 py-5 font-extrabold text-lg bg-green-500 text-white shadow hover:brightness-95 transition flex items-center gap-2"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.52-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.366.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
        <Featured />
        <Tiles />
        <Programs />
        <WhatsappFloat />

        {/* Botón flotante de acceso al dashboard */}
        <a
          href="/admin"
          className="fixed bottom-6 right-6 z-50 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 transition-all"
          style={{ boxShadow: "0 4px 24px 0 #8e1dd155" }}
          aria-label="Ir al dashboard de administración"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="white" d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm2-8h4V5h-4v8Z"/></svg>
          Dashboard
        </a>
      </main>
    </>
  );
}
