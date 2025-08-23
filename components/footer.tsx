export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-[1200px] px-6 py-10 grid gap-6 sm:grid-cols-3">
        <div>
          <div className="font-extrabold text-lg">
            WellFit<span style={{ color:"var(--wf-primary)" }}>Go</span>
          </div>
          <p className="text-sm text-neutral-600 mt-2">
            Bienestar que se siente, se vive y se transforma.
          </p>
        </div>
        <nav className="text-sm">
          <div className="font-bold mb-2">Secciones</div>
          <ul className="space-y-1">
            <li><a href="/programas" className="hover:underline">Programas</a></li>
            <li><a href="#descargables" className="hover:underline">Descargables</a></li>
            <li><a href="https://www.wellfitgo.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Tienda</a></li>
          </ul>
        </nav>
        <div className="text-sm">
          <div className="font-bold mb-2">Contacto</div>
          <p>info@wellfitgo.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-neutral-500 pb-6">
        © {new Date().getFullYear()} WellFitGo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
