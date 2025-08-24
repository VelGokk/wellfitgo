
// Hero personalizado inline para reflejar cambios solicitados
import Featured from "@/components/featured";
import Tiles from "@/components/tiles";
import Programs from "@/components/programs";
import WhatsappFloat from "@/components/whatsapp-float";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Bienvenido a la Comunidad - Mi Prueba</title>
        <meta name="description" content="Comunidad de bienestar, retos, recursos y programas destacados para tu salud y desarrollo personal." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main role="main" aria-label="Contenido principal">
        <section className="py-16 text-center bg-[var(--color-background)]">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[var(--color-text)]">WellFitGo</h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">Programas, retos y recursos para transformar tus hábitos. Esta landing es solo la parte visual: desde aquí te derivamos a nuestra tienda, a la biblioteca de recursos y a otras secciones clave. Sin precios, sin fricción.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/programas" className="rounded-full px-10 py-5 font-extrabold text-lg bg-[var(--color-secondary)] text-[var(--color-text)] shadow hover:brightness-95 transition">Explorar Programas</a>
              <a href="/biblioteca" className="rounded-full px-10 py-5 font-extrabold text-lg bg-[var(--color-text)] text-white shadow hover:brightness-95 transition">Biblioteca (de recursos)</a>
            </div>
          </div>
        </section>
        <Featured />
  <Tiles />     {/* sección visual con más fotos (retos + recursos) */}
  <Programs />  {/* bloque “Programas destacados” + bloque Biblioteca */}
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
