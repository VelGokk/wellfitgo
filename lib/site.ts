import rawSite from "@/content/site.json";
import rawPrograms from "@/content/programs.json";

export type Site = typeof rawSite;
export type Program = {
  id: string;
  title: string;
  subtitle?: string;
  days?: number;
  image: string;
  category: string;
  url: string;
};

export const SITE: Site = rawSite as Site;
export const PROGRAMS: Program[] = rawPrograms as Program[];

export const CATEGORIES = Array.from(
  new Set(["Todos", ...PROGRAMS.map(p => p.category)])
);

export function featuredOnHome(ids: string[]): Program[] {
  const set = new Set(ids);
  return PROGRAMS.filter(p => set.has(p.id));
}

export function byCategory(cat: string): Program[] {
  if (cat === "Todos") return PROGRAMS;
  return PROGRAMS.filter(p => p.category === cat);
}
