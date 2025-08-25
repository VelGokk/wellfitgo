import { Program } from "@/lib/site";

export default function ProgramCard({ p }: { p: Program }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer"
       className="card overflow-hidden flex flex-col transition hover:shadow-lg">
      <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
      <div className="p-4 flex flex-col gap-1">
        <h4 className="font-extrabold text-lg text-[var(--color-primary)]">{p.title}</h4>
        {p.subtitle && <p className="text-sm text-[var(--gray-600)]">{p.subtitle}</p>}
        {p.days ? <span className="text-xs text-[var(--gray-500)]">{p.days} días</span> : null}
        <div className="mt-3">
          <span className="button text-sm font-bold px-4 py-2">
            Ver detalles
          </span>
        </div>
      </div>
    </a>
  );
}
