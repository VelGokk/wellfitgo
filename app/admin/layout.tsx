
import "@/app/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<head>
				<title>Panel de Administración | WellFitGo</title>
				<meta name="robots" content="noindex, nofollow" />
			</head>
			<body className="bg-[#fbf5f8] min-h-screen">
				<Navbar />
				<div className="pt-16 min-h-[80vh]">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
