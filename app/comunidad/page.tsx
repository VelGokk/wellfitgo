
import Head from "next/head";

export default function ComunidadPage() {
	return (
		<>
			<Head>
				<title>Comunidad | WellFitGo</title>
				<meta name="description" content="Únete a la comunidad WellFitGo y accede a recursos, retos y acompañamiento para tu bienestar." />
			</Head>
					<main className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--bg)] py-16">
						<h1 className="text-3xl font-extrabold text-[var(--color-primary)] mb-4">Comunidad WellFitGo</h1>
						<p className="text-lg text-gray-700 max-w-xl text-center mb-8">
							Únete a nuestra comunidad y accede a recursos exclusivos, retos, acompañamiento y mucho más para transformar tus hábitos y potenciar tu bienestar.
						</p>
						<a
							href="https://www.wellfitgo.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition"
						>
							Ir a la Comunidad
						</a>
					</main>
		</>
	);
}
