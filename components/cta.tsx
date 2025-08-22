export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#faf7f9] to-white border-t border-neutral-200">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold">
          ¿Listo para impulsar tu bienestar con WellFitGo?
        </h3>
        <p className="text-neutral-600 max-w-[640px] mx-auto mt-3">
          Explora la tienda o guarda esta landing. Los accesos a programas y
          descargables están a un clic.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="https://tu-tienda.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#231F20] text-white font-extrabold hover:opacity-90"
          >
            Ir a la Tienda
          </a>
          <a
            href="#programas"
            className="px-6 py-3 rounded-full bg-[#F7B5CD] text-[#231F20] font-extrabold hover:brightness-95"
          >
            Ver Programas
          </a>
        </div>
      </div>
    </section>
  );
}
