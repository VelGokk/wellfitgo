// app/admin/leads/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

type Lead = {
  id: number;
  nombre: string;
  email: string;
  whatsapp: string;
  origen: string;
  created_at: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Trae leads desde la API en Donweb (api/lead_list.php)
  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/lead_list.php");
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error("Error cargando leads:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // 🔹 Exportar leads como CSV
  const exportCSV = () => {
    const headers = ["ID", "Nombre", "Email", "WhatsApp", "Origen", "Fecha"];
    const rows = leads.map((l) => [
      l.id,
      l.nombre,
      l.email,
      l.whatsapp,
      l.origen,
      l.created_at,
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "leads.csv";
    link.click();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📊 Leads</h1>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-[#8e1dd1] hover:bg-[#6c14a0] text-white px-4 py-2 rounded-lg shadow"
        >
          <Download size={18} /> Exportar CSV
        </button>
      </div>

      {loading ? (
        <p className="text-neutral-500">Cargando leads...</p>
      ) : leads.length === 0 ? (
        <p className="text-neutral-500">No hay leads registrados todavía.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">WhatsApp</th>
                <th className="px-4 py-2 border-b">Origen</th>
                <th className="px-4 py-2 border-b">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="text-sm hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{lead.id}</td>
                  <td className="px-4 py-2 border-b">{lead.nombre}</td>
                  <td className="px-4 py-2 border-b">{lead.email}</td>
                  <td className="px-4 py-2 border-b">{lead.whatsapp}</td>
                  <td className="px-4 py-2 border-b">{lead.origen}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(lead.created_at).toLocaleString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
