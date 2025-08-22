import Image from "next/image";

type Media =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "youtube"; id?: string; url?: string; alt?: string }
  | { kind: "video"; src: string; poster?: string; alt?: string };

export default function HeroMedia({ media }: { media: Media }) {
  if (media.kind === "image") {
    return (
      <aside className="relative rounded-3xl border border-neutral-200 shadow-lg overflow-hidden">
        <Image
          src={media.src}
          alt={media.alt || "Imagen de portada"}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          priority
        />
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
          WellFitGo
        </span>
      </aside>
    );
  }

  if (media.kind === "youtube") {
    const videoId =
      media.id || (media.url ? new URL(media.url).searchParams.get("v") || "" : "");
    return (
      <aside className="relative rounded-3xl border border-neutral-200 shadow-lg overflow-hidden">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={media.alt || "Video de YouTube"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </aside>
    );
  }

  if (media.kind === "video") {
    return (
      <aside className="relative rounded-3xl border border-neutral-200 shadow-lg overflow-hidden">
        <video
          src={media.src}
          poster={media.poster}
          controls
          className="w-full rounded-3xl"
        />
      </aside>
    );
  }

  return null;
}
