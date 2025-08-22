export default function Footer() {
  return (
    <footer className="bg-[#231F20] text-white py-10 mt-12">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Marca */}
        <div>
          <h2 className="text-2xl font-extrabold">WellFitGo</h2>
          <p className="mt-2 text-sm text-gray-300">
            Transformando hábitos con programas, retos y recursos para tu bienestar.
          </p>
        </div>

        {/* Columna 2: Links */}
        <div>
          <h3 className="font-semibold mb-3">Enlaces rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#programas" className="hover:underline">Programas</a></li>
            <li><a href="#descargables" className="hover:underline">Descargables</a></li>
            <li><a href="#tienda" className="hover:underline">Tienda</a></li>
            <li><a href="#contacto" className="hover:underline">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales */}
        <div>
          <h3 className="font-semibold mb-3">Síguenos</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">🌐 Fb</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">📸 Ig</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">▶️ Yt</a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} WellFitGo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
