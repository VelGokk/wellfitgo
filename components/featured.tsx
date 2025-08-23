export default function Featured() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10">
      <div className="rounded-3xl bg-white shadow-sm p-8">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3">El arte de crear hábitos</h3>
        <p className="text-neutral-700 leading-relaxed">
          Un recorrido claro y práctico para construir hábitos que se sostienen en el tiempo,
          combinando movimiento, alimentación y bienestar emocional.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/programas" className="px-5 py-2 rounded-full text-white font-bold"
             style={{ backgroundColor:"var(--wf-primary)" }}>
            Ver Programas
          </a>
          <a href="#descargables" className="px-5 py-2 rounded-full text-white font-bold"
             style={{ backgroundColor:"var(--wf-dark)" }}>
            Ver Retos
          </a>
        </div>
      </div>
    </section>
  );
}
