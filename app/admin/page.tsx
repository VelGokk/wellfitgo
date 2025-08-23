"use client";
import { useState } from "react";
import { SITE as SITE_DEFAULT, PROGRAMS as PROGRAMS_DEFAULT } from "@/lib/site";

export default function AdminPage() {
  const [site, setSite] = useState<any>(SITE_DEFAULT);
  const [programs, setPrograms] = useState<any[]>(PROGRAMS_DEFAULT);

  function download(name: string, data: unknown) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  function updateProgram(i: number, field: string, value: string) {
    const next = [...programs];
    next[i] = { ...next[i], [field]: value };
    setPrograms(next);
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-6">Dashboard (local)</h1>

      {/* Marca / colores */}
      <section className="rounded-2xl bg-white p-6 shadow-sm mb-8">
        <h2 className="font-bold text-xl mb-4">Marca</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm">
            Nombre
            <input className="mt-1 w-full border rounded p-2"
              value={site.brand.name}
              onChange={e => setSite({ ...site, brand: { ...site.brand, name: e.target.value }})}/>
          </label>
          <label className="text-sm">
            Logo (ruta pública)
            <input className="mt-1 w-full border rounded p-2"
              value={site.brand.logo}
              onChange={e => setSite({ ...site, brand: { ...site.brand, logo: e.target.value }})}/>
          </label>
          <label className="text-sm">
            Favicon (ruta pública)
            <input className="mt-1 w-full border rounded p-2"
              value={site.brand.favicon}
              onChange={e => setSite({ ...site, brand: { ...site.brand, favicon: e.target.value }})}/>
          </label>

          {["primary","accent","cta","dark","bg"].map(k => (
            <label key={k} className="text-sm">
              Color {k}
              <input className="mt-1 w-full border rounded p-2" type="text"
                value={site.brand.colors[k]}
                onChange={e => setSite({
                  ...site,
                  brand: { ...site.brand, colors: { ...site.brand.colors, [k]: e.target.value } }
                })}/>
            </label>
          ))}
        </div>
      </section>

      {/* Hero */}
      <section className="rounded-2xl bg-white p-6 shadow-sm mb-8">
        <h2 className="font-bold text-xl mb-4">Hero</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm">
            Kicker
            <input className="mt-1 w-full border rounded p-2"
              value={site.hero.kicker}
              onChange={e => setSite({ ...site, hero: { ...site.hero, kicker: e.target.value }})}/>
          </label>
          <label className="text-sm">
            Título
            <input className="mt-1 w-full border rounded p-2"
              value={site.hero.title}
              onChange={e => setSite({ ...site, hero: { ...site.hero, title: e.target.value }})}/>
          </label>
          <label className="col-span-full text-sm">
            Descripción
            <textarea className="mt-1 w-full border rounded p-2"
              rows={3}
              value={site.hero.description}
              onChange={e => setSite({ ...site, hero: { ...site.hero, description: e.target.value }})}/>
          </label>

          <div className="col-span-full border rounded p-4">
            <div className="font-bold mb-2">Media</div>
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="text-sm">
                kind (image | youtube | video)
                <input className="mt-1 w-full border rounded p-2"
                  value={site.hero.media.kind}
                  onChange={e => setSite({ ...site, hero: { ...site.hero, media: { ...site.hero.media, kind: e.target.value }}})}/>
              </label>
              <label className="text-sm">
                id/url/src
                <input className="mt-1 w-full border rounded p-2"
                  value={site.hero.media.id || site.hero.media.url || site.hero.media.src || ""}
                  onChange={e => {
                    const val = e.target.value;
                    const m = { ...site.hero.media };
                    if (m.kind === "youtube") { delete (m as any).src; (m as any).id = val; }
                    if (m.kind === "video")   { delete (m as any).id;  (m as any).src = val; }
                    if (m.kind === "image")   { delete (m as any).id;  (m as any).src = val; }
                    setSite({ ...site, hero: { ...site.hero, media: m }});
                  }}/>
              </label>
              <label className="text-sm">
                poster (opcional)
                <input className="mt-1 w-full border rounded p-2"
                  value={(site.hero.media as any).poster || ""}
                  onChange={e => setSite({ ...site, hero: { ...site.hero, media: { ...site.hero.media, poster: e.target.value }}})}/>
              </label>
            </div>
          </div>

          <label className="text-sm">
            CTA primaria
            <input className="mt-1 w-full border rounded p-2"
              value={site.hero.ctaPrimaryText}
              onChange={e => setSite({ ...site, hero: { ...site.hero, ctaPrimaryText: e.target.value }})}/>
          </label>
          <label className="text-sm">
            CTA secundaria
            <input className="mt-1 w-full border rounded p-2"
              value={site.hero.ctaSecondaryText}
              onChange={e => setSite({ ...site, hero: { ...site.hero, ctaSecondaryText: e.target.value }})}/>
          </label>
          <label className="text-sm">
            CTA prueba (texto)
            <input className="mt-1 w-full border rounded p-2"
              value={site.hero.ctaTestText}
              onChange={e => setSite({ ...site, hero: { ...site.hero, ctaTestText: e.target.value }})}/>
          </label>
          <label className="text-sm">
            CTA prueba (URL)
            <input className="mt-1 w-full border rounded p-2"
              value={site.hero.ctaTestUrl}
              onChange={e => setSite({ ...site, hero: { ...site.hero, ctaTestUrl: e.target.value }})}/>
          </label>
        </div>
      </section>

      {/* Programas */}
      <section className="rounded-2xl bg-white p-6 shadow-sm mb-8">
        <h2 className="font-bold text-xl mb-4">Programas</h2>
        <div className="space-y-4">
          {programs.map((p, i) => (
            <div key={p.id} className="grid md:grid-cols-6 gap-3 border rounded p-3">
              <input className="md:col-span-1 border rounded p-2" value={p.id} onChange={e => updateProgram(i,"id", e.target.value)} placeholder="id"/>
              <input className="md:col-span-2 border rounded p-2" value={p.title} onChange={e => updateProgram(i,"title", e.target.value)} placeholder="title"/>
              <input className="md:col-span-1 border rounded p-2" value={p.category} onChange={e => updateProgram(i,"category", e.target.value)} placeholder="category"/>
              <input className="md:col-span-1 border rounded p-2" value={p.days ?? ""} onChange={e => updateProgram(i,"days", e.target.value)} placeholder="days"/>
              <input className="md:col-span-1 border rounded p-2" value={p.url} onChange={e => updateProgram(i,"url", e.target.value)} placeholder="url"/>
              <input className="md:col-span-6 border rounded p-2" value={p.image} onChange={e => updateProgram(i,"image", e.target.value)} placeholder="image"/>
            </div>
          ))}
        </div>
      </section>

      {/* Featured en Home */}
      <section className="rounded-2xl bg-white p-6 shadow-sm mb-8">
        <h2 className="font-bold text-xl mb-4">Destacados en Home</h2>
        <input className="w-full border rounded p-2"
          value={site.home.featuredPrograms.join(",")}
          onChange={e => setSite({ ...site, home: { ...site.home, featuredPrograms: e.target.value.split(",").map(s => s.trim()) }})}/>
        <p className="text-xs text-neutral-600 mt-1">IDs separados por coma (de programs.json)</p>
      </section>

      {/* Exportar */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-bold text-xl mb-4">Exportar</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded bg-black text-white" onClick={() => download("site.json", site)}>Descargar site.json</button>
          <button className="px-4 py-2 rounded bg-black text-white" onClick={() => download("programs.json", programs)}>Descargar programs.json</button>
        </div>
        <p className="text-sm text-neutral-600 mt-3">
          Reemplazá los archivos en <code>/content</code>, corré <code>npm run build</code> y subí la carpeta <code>/out</code> a DonWeb.
        </p>
      </section>
    </main>
  );
}
