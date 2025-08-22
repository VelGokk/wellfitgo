export default function Featured() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-[1200px] px-6">
        <div
          className="rounded-3xl min-h-[380px] grid md:grid-cols-2 overflow-hidden text-white"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(35,31,32,.45), rgba(35,31,32,.45)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-8 md:p-12 self-center">
            <p className="uppercase tracking-widest font-extrabold text-[#F7B5CD]">
              Nuevo
            </p>
            <h3 className="text-3xl md:text-4xl font-extrabold mt-2">
              El arte de crear hábitos
            </h3>
            <p className="opacity-90 mt-3 max-w-[560px]">
              Un recorrido de 4 semanas con rutinas, guías y clases grabadas
              para construir disciplina real. Incluye plan de acción, bitácora y
              comunidad.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://tu-tienda.com/programa-habitos"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white text-black font-bold hover:bg-neutral-100"
              >
                Ir a la Tienda
              </a>
              <a
                href="#retos"
                className="px-5 py-3 rounded-full bg-[#231F20] text-white font-bold hover:opacity-90"
              >
                Ver Retos
              </a>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
