// app/admin/settings/page.tsx
"use client";

import { useEffect, useState } from "react";

type Settings = {
  siteTitle: string;
  contactEmail: string;
  whatsapp: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteTitle: "",
    contactEmail: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Cargar configuración actual
  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/settings_get.php");
        const data = await res.json();
        setSettings(data || {});
      } catch (err) {
        console.error("Error al cargar configuración", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // Guardar configuración
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings_save.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        alert("Configuración guardada correctamente");
      } else {
        alert("Error al guardar configuración");
      }
    } catch (err) {
      alert("Error al conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-[#8e1dd1] mb-6">
        Configuración del sitio
      </h1>
      {loading ? (
        <p>Cargando configuración...</p>
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
        >
          <div>
            <label className="block font-bold mb-1">Título del sitio</label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) =>
                setSettings({ ...settings, siteTitle: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Email de contacto</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) =>
                setSettings({ ...settings, contactEmail: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1">WhatsApp</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-6 py-2 rounded-lg font-bold"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      )}
    </div>
  );
}