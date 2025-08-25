"use client";
import { useState } from "react";

type Field = {
  type: "text" | "textarea" | "number" | "select" | "radio" | "email";
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  pattern?: string;
};

export default function LeadForm({
  formName,
  extra,
  thankUrl = "/gracias"
}: {
  formName: string;
  extra?: Field[];
  thankUrl?: string;
}) {
  const endpoint = "/lead.php";
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const baseFields: Field[] = [
    { type: "text", name: "nombre", label: "Nombre completo", required: true, placeholder: "Ej: María Pérez" },
    { type: "email", name: "email", label: "Email", required: true, placeholder: "tu@email.com" },
    {
      type: "text",
      name: "whatsapp",
      label: "WhatsApp (con código de país)",
      required: true,
      placeholder: "Ej: +54 9 11 1234-5678",
      pattern: "^[+0-9 ()-]{6,}$"
    },
    { type: "textarea", name: "mensaje", label: "Mensaje", required: false, placeholder: "Dejá tu consulta o comentario (opcional)" }
  ];
  const fields = [...baseFields, ...(extra || [])];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const nombre = fd.get("nombre") || "";
    const email = fd.get("email") || "";
    const mensaje = fd.get("mensaje") || "";
    const origen = formName || "web";

    const phpData = new FormData();
    phpData.append("nombre", nombre as string);
    phpData.append("email", email as string);
    phpData.append("mensaje", mensaje as string);
    phpData.append("origen", origen);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: phpData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "No se pudo enviar el formulario");
      window.location.href = thankUrl;
    } catch (er: any) {
      setErr(er.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 card p-6">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-semibold mb-1 text-[var(--color-primary)]">
            {f.label}
            {f.required && " *"}
          </label>
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              required={f.required}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-[var(--gray-300)] p-3 min-h-[120px] focus:ring-2 focus:ring-[var(--color-secondary)]"
            />
          ) : f.type === "select" ? (
            <select name={f.name} required={f.required} className="w-full rounded-xl border border-[var(--gray-300)] p-3 focus:ring-2 focus:ring-[var(--color-secondary)]">
              <option value="">Seleccioná…</option>
              {f.options?.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          ) : f.type === "radio" ? (
            <div className="flex flex-wrap gap-3">
              {f.options?.map((op) => (
                <label key={op} className="inline-flex items-center gap-2">
                  <input type="radio" name={f.name} value={op} required={f.required} />
                  <span>{op}</span>
                </label>
              ))}
            </div>
          ) : (
            <input
              type={f.type === "email" ? "email" : f.type}
              name={f.name}
              required={f.required}
              placeholder={f.placeholder}
              pattern={f.pattern}
              className="w-full rounded-xl border border-[var(--gray-300)] p-3 focus:ring-2 focus:ring-[var(--color-secondary)]"
            />
          )}
        </div>
      ))}
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button
        disabled={loading}
        className="button px-6 py-3 font-extrabold"
      >
        {loading ? "Enviando…" : "Enviar"}
      </button>
      <p className="text-xs text-neutral-500">
        Al enviar aceptás ser contactad@ para recibir tu evaluación.
      </p>
    </form>
  );
}
