import { Program } from "@/lib/site";

export default function ProgramCard({ p }: { p: Program }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer"
       className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow transition flex flex-col">
      <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
      <div className="p-4 flex flex-col gap-1">
        <h4 className="font-extrabold">{p.title}</h4>
        {p.subtitle && <p className="text-sm text-neutral-600">{p.subtitle}</p>}
        {p.days ? <span className="text-xs text-neutral-500">{p.days} días</span> : null}
        <div className="mt-3">
          <span className="inline-block text-sm font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor:"var(--wf-primary)", color:"#fff" }}>
            Ver detalles
          </span>
        </div>
      </div>
    </a>
  );
}
