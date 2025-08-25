export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-[var(--color-background)]">
      <div className="mx-auto max-w-[1200px] px-6 py-10 grid gap-6 sm:grid-cols-3">
        <div>
          <div className="font-extrabold text-2xl text-[var(--color-primary)]">
            WellFit<span className="text-[var(--color-secondary)]">Go</span>
          </div>
          <p className="text-sm text-[var(--gray-700)] mt-2">
            Bienestar que se siente, se vive y se transforma.
          </p>
        </div>
        <nav className="text-sm">
          <div className="font-bold mb-2 text-[var(--color-primary)]">Secciones</div>
          <ul className="space-y-1">
            <li><a href="/descargo/programas" className="hover:underline">Programas</a></li>
            <li><a href="https://www.wellfitgo.com/category/recetarios-guias-ebooks" target="_blank" rel="noopener noreferrer" className="hover:underline" aria-label="Ir a la biblioteca de recursos en tienda WellFitGo">Biblioteca (de recursos)</a></li>
            <li><a href="https://www.wellfitgo.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Tienda</a></li>
          </ul>
        </nav>
        <div className="text-sm">
          <div className="font-bold mb-2 text-[var(--color-primary)]">Contacto</div>
          <p>info@wellfitgo.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-[var(--gray-600)] pb-6">
        © {new Date().getFullYear()} WellFitGo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
