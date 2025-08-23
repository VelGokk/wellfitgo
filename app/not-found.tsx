export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 text-center">
      <h1 className="text-4xl font-extrabold mb-2">Página no encontrada</h1>
      <p className="text-neutral-600 mb-6">Revisa la URL o vuelve al inicio.</p>
      <a href="/" className="px-5 py-2 rounded-full text-white font-bold" style={{ backgroundColor:"var(--wf-primary)" }}>
        Volver al inicio
      </a>
    </main>
  );
}
