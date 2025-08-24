// lib/wix.ts
// Utilidad para obtener programas desde la API de WIX LMS

export async function fetchWixPrograms() {
  // Reemplaza la URL y headers según tu API de WIX
  const API_URL = "https://www.tu-dominio-wix.com/_functions/programs";
  // Si necesitas autenticación, agrega el header correspondiente
  // const headers = { "Authorization": "Bearer TU_TOKEN" };
  const res = await fetch(API_URL /*, { headers }*/);
  if (!res.ok) throw new Error("No se pudo obtener la lista de programas de WIX");
  // Ajusta el parseo según la estructura de tu API
  const data = await res.json();
  // data.items o data.programs según tu API
  return data.items || data.programs || [];
}
