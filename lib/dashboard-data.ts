// lib/dashboard-data.ts
// Simulación de almacenamiento en localStorage para el dashboard

export function getDashboardData() {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem("dashboardData");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setDashboardData(data: any) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("dashboardData", JSON.stringify(data));
  } catch {}
}
