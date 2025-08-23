import { MetadataRoute } from "next";
import { EVALUACIONES } from "@/lib/evaluaciones";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tudominio.com";
  const now = new Date();

  const evals = EVALUACIONES.map(e => ({
    url: `${base}/evaluaciones/${e.key}`,
    lastModified: now
  }));

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/programas`, lastModified: now },
    { url: `${base}/descargables`, lastModified: now },
    { url: `${base}/evaluaciones`, lastModified: now },
    ...evals
  ];
}
