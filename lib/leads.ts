// lib/leads.ts
// Simulación de almacenamiento local de leads para el dashboard

export function getLeads() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("leads");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addLead(lead: any) {
  if (typeof window === "undefined") return;
  try {
    const leads = getLeads();
    leads.push(lead);
    localStorage.setItem("leads", JSON.stringify(leads));
  } catch {}
}
