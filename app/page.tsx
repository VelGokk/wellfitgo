import Hero from "@/components/hero";
import Featured from "@/components/featured";
import Programs from "@/components/programs";
import Tiles from "@/components/tiles";
import Downloads from "@/components/downloads";
import CTA from "@/components/cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#231F20]">
      <Hero />
      <Featured />
      <Programs />
      <Tiles />
      <Downloads />
      <CTA />
      <footer className="text-center text-sm text-neutral-500 py-6">
        © WellFitGo 2025.
      </footer>
    </main>
  );
}
