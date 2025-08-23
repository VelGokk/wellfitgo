import Image from "next/image";

export type Media =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "youtube"; id?: string; url?: string; alt?: string; poster?: string }
  | { kind: "video"; src: string; poster?: string; alt?: string };

function getYouTubeId(input?: { id?: string; url?: string }) {
  if (!input) return "";
  if (input.id) return input.id.trim();
  const url = input.url?.trim();
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.searchParams.get("v")) return u.searchParams.get("v") || "";
    const parts = u.pathname.split("/");
    const idx = parts.findIndex(p => p === "embed");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {}
  return "";
}

export default function HeroMedia({ media }: { media: Media }) {
  if (!media) return null;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <aside className="relative rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {children}
      </div>
    </aside>
  );

  if (media.kind === "youtube") {
    const videoId = getYouTubeId({ id: media.id, url: media.url });
    if (!videoId) return null;
    return (
      <Wrapper>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`}
          title={media.alt || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allowFullScreen
        />
      </Wrapper>
    );
  }

  if (media.kind === "video") {
    return (
      <Wrapper>
        <video className="absolute inset-0 w-full h-full object-cover"
               src={media.src} poster={media.poster} controls playsInline preload="metadata" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Image src={media.src} alt={media.alt || ""} fill className="object-cover" priority />
    </Wrapper>
  );
}
