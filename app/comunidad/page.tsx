
import Head from "next/head";

export default function ComunidadPage() {
	return (
		<>
			<Head>
				<title>Comunidad | WellFitGo</title>
				<meta name="description" content="Únete a la comunidad WellFitGo y accede a recursos, retos y acompañamiento para tu bienestar." />
			</Head>
			<main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fbf5f8] py-16">
				<h1 className="text-3xl font-extrabold text-[#8e1dd1] mb-4">Comunidad WellFitGo</h1>
				<p className="text-lg text-neutral-700 max-w-xl text-center mb-8">
					Únete a nuestra comunidad y accede a recursos exclusivos, retos, acompañamiento y mucho más para transformar tus hábitos y potenciar tu bienestar.
				</p>
				<a
					href="https://www.wellfitgo.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition"
				>
					Ir a la Comunidad
				</a>
			</main>
		</>
	);
}
