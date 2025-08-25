import Head from "next/head";

export default function ProgramasInfoPage() {
  return (
    <>
      <Head>
        <title>Programas WellFitGo</title>
        <meta name="description" content="Descubre los programas de WellFitGo: retos, guías y acompañamiento para transformar tus hábitos y bienestar." />
      </Head>
      <main className="max-w-3xl mx-auto py-16 px-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#8e1dd1] drop-shadow">Nuestros Programas</h1>
          <p className="text-lg md:text-xl text-neutral-700 mb-6">Descubre una selección de programas diseñados para transformar tus hábitos, mejorar tu salud y acompañarte en cada paso. Sin atajos, sin fórmulas mágicas: solo ciencia, comunidad y motivación real.</p>
        </section>
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-[#f3e6fa]">
            <img src="/assets/logo.svg" alt="Logo WellFitGo" className="w-20 h-20 mb-4" />
            <h2 className="font-bold text-2xl mb-2 text-[#8e1dd1]">Programas de Movimiento</h2>
            <p className="text-neutral-700 mb-2">Entrenamientos y desafíos para todos los niveles. Desde rutinas express hasta retos de 30 días, siempre acompañados por la comunidad.</p>
            <img src="/public/assets/og.jpg" alt="Entrenamiento" className="rounded-xl shadow w-full object-cover h-40" />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-[#f3e6fa]">
            <img src="/assets/logo.svg" alt="Logo WellFitGo" className="w-20 h-20 mb-4" />
            <h2 className="font-bold text-2xl mb-2 text-[#8e1dd1]">Nutrición y Bienestar</h2>
            <p className="text-neutral-700 mb-2">Planes de alimentación, guías de hábitos y recursos para que logres tus objetivos de forma saludable y sostenible.</p>
            <img src="/public/assets/plan-nutricion.jpg" alt="Nutrición" className="rounded-xl shadow w-full object-cover h-40" />
          </div>
        </section>
        <section className="text-center mt-10">
          <h3 className="text-2xl font-bold mb-4">¿Querés saber cuál es el mejor programa para vos?</h3>
          <p className="mb-6 text-neutral-700">Escribinos por WhatsApp y te ayudamos a elegir el programa ideal según tus objetivos y preferencias.</p>
          <a
            href="https://wa.me/541130085655?text=Hola%20WellFitGo!%20Quiero%20saber%20cu%C3%A1l%20es%20el%20mejor%20programa%20para%20mí.%20%F0%9F%98%8A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-extrabold text-lg bg-green-500 text-white shadow hover:brightness-95 transition"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.52-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.366.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/></svg>
            Consultar por WhatsApp
          </a>
        </section>
      </main>
    </>
  );
}
