import { NextResponse } from "next/server";

// GET: Obtener leads (simulado)
export async function GET() {
  try {
    // TODO: Obtener leads desde la base de datos real
    return NextResponse.json([]); // Devuelve un array vacío por ahora
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al obtener leads" }, { status: 500 });
  }
}

// POST: Crear lead (simulado)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Validación básica
    if (!data.nombre || !data.email || !data.whatsapp || !data.origen) {
      return NextResponse.json({ success: false, message: "Faltan campos obligatorios" }, { status: 400 });
    }
    // Validación de email simple
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      return NextResponse.json({ success: false, message: "Email inválido" }, { status: 400 });
    }
    // Aquí deberás guardar el lead en la base de datos real (Donweb)
    // Por ahora, solo simula la respuesta exitosa
    return NextResponse.json({ success: true, lead: { ...data, created_at: new Date().toISOString() } });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al procesar la solicitud" }, { status: 500 });
  }
}
