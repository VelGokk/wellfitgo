++

import { useEffect } from "react";

export default function DescargoProgramas() {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  function handleContinuar() {
    window.location.href = "https://www.wellfitgo.com/";
  }
  return (
    <>
      <head>
        <title>Descargo de responsabilidad - Programas</title>
        <meta name="description" content="Aviso importante sobre los programas de WellFitGo." />
        <meta name="robots" content="noindex" />
      </head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 border border-[var(--gray-300)] animate-fade-in">
          <h1 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">Descargo de responsabilidad</h1>
          <p className="mb-4 text-[var(--gray-700)]">
            <b>Los programas de WellFitGo son de pago.</b> Por una funcionalidad del sistema, pueden aparecer como gratuitos, pero requieren abono previo y <b>el acceso se otorga solo tras la aprobación de los administradores</b>.
          </p>
          <p className="mb-6 text-[var(--gray-700)]">
            Si tienes dudas, consulta a nuestro equipo antes de realizar cualquier acción. Al continuar, serás redirigido a la tienda oficial.
          </p>
          <button
            className="button w-full py-3 font-bold text-lg"
            onClick={handleContinuar}
            aria-label="Continuar a la tienda de programas WellFitGo"
          >
            Entiendo y deseo continuar
          </button>
        </div>
      </main>
    </>
  );
}