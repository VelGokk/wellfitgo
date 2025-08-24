// components/hero.tsx
import HeroMedia, { type Media } from "@/components/heromedia";
import { SITE } from "@/lib/site";

export default function Hero() {
  const h = SITE.hero;
  const media: Media =
    h.media.kind === "youtube"
      ? { kind: "youtube", id: h.media.id, alt: "Bienvenida" }
      : h.media.kind === "video"
      ? { kind: "video", src: "/videos/intro.mp4", poster: h.media.poster, alt: "Presentación" }
      : { kind: "image", src: "/assets/hero.jpg", alt: "Portada" };

  return (
    <header>
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <p className="uppercase tracking-widest font-extrabold" style={{ color: "var(--wf-accent)" }}>
            {h.kicker}
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold">{h.title}</h1>
          <p className="mt-4 text-lg text-neutral-700 leading-relaxed">{h.description}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/programas"
              className="px-6 py-3 rounded-full font-extrabold text-center shadow hover:brightness-95"
              style={{ backgroundColor: "var(--wf-accent)", color: "var(--wf-dark)" }}
            >
              {h.ctaPrimaryText}
            </a>
            <a
              href="#biblioteca"
              className="px-6 py-3 rounded-full font-extrabold text-center hover:opacity-90"
              style={{ backgroundColor: "var(--wf-dark)", color: "#fff" }}
            >
              {h.ctaSecondaryText}
            </a>
            <a
              href={h.ctaTestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-extrabold text-center hover:brightness-95"
              style={{ backgroundColor: "var(--wf-cta)", color: "var(--wf-dark)" }}
            >
              {h.ctaTestText}
            </a>
          </div>
        </div>
        <HeroMedia media={media} />
      </div>
    </header>
  );
}
