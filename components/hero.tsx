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
    <header className="bg-[var(--color-background)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <p className="uppercase tracking-widest font-extrabold text-[var(--color-accent)]">
            {h.kicker}
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] drop-shadow-sm">{h.title}</h1>
          <p className="mt-4 text-lg text-[var(--gray-700)] leading-relaxed">{h.description}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/programas"
              className="button px-6 py-3 font-extrabold text-center shadow"
            >
              {h.ctaPrimaryText}
            </a>
            <a
              href="#biblioteca"
              className="button px-6 py-3 font-extrabold text-center shadow"
              style={{ background: "var(--pink-600)", color: "var(--black)" }}
            >
              {h.ctaSecondaryText}
            </a>
            <a
              href={h.ctaTestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button px-6 py-3 font-extrabold text-center shadow"
              style={{ background: "var(--celeste)", color: "var(--white)" }}
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
