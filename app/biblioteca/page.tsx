import { PROGRAMS } from "@/lib/site";
import ProgramCard from "@/components/program-card";

import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export default function BibliotecaPage() {
  redirect(SITE.links.shop);
  return null;
}
      <a
