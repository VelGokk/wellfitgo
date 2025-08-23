import Hero from "@/components/hero";
import Featured from "@/components/featured";
import Tiles from "@/components/tiles";
import Programs from "@/components/programs";
import WhatsappFloat from "@/components/whatsapp-float";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Featured />
      <Tiles />     {/* sección visual con más fotos (retos + recursos) */}
      <Programs />  {/* bloque “Programas destacados” + bloque Descargables */}
      <WhatsappFloat />
    </main>
  );
}

