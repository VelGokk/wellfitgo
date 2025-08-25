export default function Featured() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10">
      <div className="card p-8">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-[var(--color-primary)]">El arte de crear hábitos</h3>
        <p className="text-[var(--gray-700)] leading-relaxed">
          Un recorrido claro y práctico para construir hábitos que se sostienen en el tiempo,
          combinando movimiento, alimentación y bienestar emocional.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/programas" className="button px-5 py-2 font-bold">
            Ver Programas
          </a>
          <a href="#biblioteca" className="button px-5 py-2 font-bold" style={{ background: "var(--gray-100)", color: "var(--black)" }}>
            Ver Retos
          </a>
        </div>
      </div>
    </section>
  );
}
