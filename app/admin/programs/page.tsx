// app/admin/programs/page.tsx
"use client";

import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  featured: boolean;
};

export default function ProgramsAdminPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Program>>({});
  const [editing, setEditing] = useState<Program | null>(null);

  // Cargar lista de programas
  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/programs_list.php");
      const data = await res.json();
      setPrograms(data || []);
    } catch (err) {
      console.error("Error al cargar programas", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Guardar programa (nuevo o editado)
  const handleSave = async () => {
    try {
      const res = await fetch("/api/programs_save.php", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        fetchPrograms();
        setForm({});
        setEditing(null);
      } else {
        alert("Error al guardar programa");
      }
    } catch (err) {
      console.error("Error guardando programa", err);
    }
  };

  // Eliminar programa
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este programa?")) return;

    try {
      const res = await fetch("/api/programs_delete.php", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchPrograms();
      } else {
        alert("Error al eliminar programa");
      }
    } catch (err) {
      console.error("Error eliminando programa", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-[#8e1dd1] mb-6">
        Administrar Programas
      </h1>

      {/* FORMULARIO */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
        <h2 className="text-lg font-bold">
          {editing ? "Editar Programa" : "Nuevo Programa"}
        </h2>

        <input
          type="text"
          placeholder="Título"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Subtítulo"
          value={form.subtitle || ""}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          placeholder="URL de imagen"
          value={form.image || ""}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured || false}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Destacado en portada
        </label>

        <button
          onClick={handleSave}
          className="bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-6 py-2 rounded-lg font-bold"
        >
          {editing ? "Actualizar" : "Crear"}
        </button>
      </div>

      {/* LISTADO */}
      {loading ? (
        <p>Cargando programas...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Título</th>
              <th className="border px-4 py-2">Subtítulo</th>
              <th className="border px-4 py-2">Imagen</th>
              <th className="border px-4 py-2">Destacado</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.title}</td>
                <td className="border px-4 py-2">{p.subtitle}</td>
                <td className="border px-4 py-2">
                  <img src={p.image} alt={p.title} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="border px-4 py-2 text-center">
                  {p.featured ? "✅" : "—"}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setForm(p);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
